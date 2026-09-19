'use client'

import { useCallback, useRef, useState } from 'react'

export interface FileWithPreview {
  id: string
  file: File
  preview: string | null
}

interface UseFileUploadOptions {
  accept?: string
  maxSize?: number
  maxFiles?: number
  onUpload?: (file: File) => Promise<unknown> | void
}

export function useFileUpload({
  accept,
  maxSize = 10 * 1024 * 1024,
  maxFiles = 10,
  onUpload,
}: UseFileUploadOptions) {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const processFiles = useCallback(
    (fileList: FileList | File[]) => {
      setErrors([])
      const incoming = Array.from(fileList)
      const errs: string[] = []

      const accepted = incoming.filter((f) => {
        if (accept) {
          const allowed = accept.split(',').map((s) => s.trim())
          const match = allowed.some((a) => {
            if (a.endsWith('/*')) return f.type.startsWith(a.replace('/*', '/'))
            return f.type === a || f.name.endsWith(a)
          })
          if (!match) {
            errs.push(`${f.name}: nepovolený typ souboru`)
            return false
          }
        }
        if (f.size > maxSize) {
          errs.push(`${f.name}: soubor je příliš velký (max ${Math.round(maxSize / 1024 / 1024)} MB)`)
          return false
        }
        return true
      })

      if (errs.length > 0) setErrors(errs)

      const mapped = accepted.map((file) => ({
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        file,
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
      }))

      setFiles((prev) => {
        const combined = [...prev, ...mapped].slice(0, maxFiles)
        return combined
      })

      mapped.forEach((m) => onUpload?.(m.file))
    },
    [accept, maxSize, maxFiles, onUpload],
  )

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      if (e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files)
      }
    },
    [processFiles],
  )

  const openFileDialog = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const removeFile = useCallback((id: string | undefined) => {
    if (!id) return
    setFiles((prev) => {
      const removed = prev.find((f) => f.id === id)
      if (removed?.preview) URL.revokeObjectURL(removed.preview)
      return prev.filter((f) => f.id !== id)
    })
  }, [])

  const getInputProps = useCallback(
    () => ({
      ref: inputRef,
      type: 'file' as const,
      accept,
      multiple: maxFiles > 1,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) processFiles(e.target.files)
        e.target.value = ''
      },
    }),
    [accept, maxFiles, processFiles],
  )

  return {
    files,
    isDragging,
    errors,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    openFileDialog,
    removeFile,
    getInputProps,
  }
}
