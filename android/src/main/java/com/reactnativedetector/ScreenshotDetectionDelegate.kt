package com.reactnativedetector

import android.content.ContentResolver
import android.content.Context
import android.database.ContentObserver
import android.net.Uri
import android.os.Handler
import android.os.Looper
import android.provider.MediaStore

class ScreenshotDetectionDelegate(
    private val context: Context,
    private val listener: ScreenshotDetectionListener
) {
    private var contentObserver: ContentObserver? = null
    private var lastScreenshotTime = 0L

    fun start() {
        if (contentObserver == null) {
            contentObserver = context.contentResolver.registerObserver()
        }
    }

    fun stop() {
        contentObserver?.let { context.contentResolver.unregisterContentObserver(it) }
        contentObserver = null
    }

    private fun ContentResolver.registerObserver(): ContentObserver {
        val contentObserver = object : ContentObserver(Handler(Looper.getMainLooper())) {
            override fun onChange(selfChange: Boolean, uri: Uri?) {
                super.onChange(selfChange, uri)

                val now = System.currentTimeMillis()

                // 👇 Emit nếu đã qua ít nhất 2 giây kể từ lần trước
                if (now - lastScreenshotTime > 2000) {
                    lastScreenshotTime = now
                    listener.onScreenCaptured()
                }
            }
        }

        registerContentObserver(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, true, contentObserver)
        return contentObserver
    }
}

