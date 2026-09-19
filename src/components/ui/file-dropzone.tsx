'use client'

import {
  AlertCircle,
  FileIcon,
  ImageIcon,
  UploadIcon,
  XIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useFileUpload } from '@/components/ui/file-dropzone-utils/use-file-upload'

export interface FileDropzoneProps {
  accept?: string
  maxSizeMB?: number
  maxFiles?: number
  multiple?: boolean
  onUpload?: (file: File) => Promise<unknown> | void
}

export const FileDropzone = ({
  accept,
  maxSizeMB = 10,
  maxFiles,
  multiple = true,
  onUpload,
}: FileDropzoneProps) => {
  const maxSize = maxSizeMB * 1024 * 1024
  const finalMaxFiles = maxFiles ?? (multiple ? 20 : 1)

  const {
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
  } = useFileUpload({
    accept,
    maxSize,
    maxFiles: finalMaxFiles,
    onUpload,
  })

  const hasFiles = files.length > 0

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div
          className={`relative flex min-h-44 flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed p-6 transition-colors duration-200 ${
            isDragging
              ? 'border-blue-600 bg-blue-50/50'
              : 'border-zinc-200 hover:border-blue-600/50 hover:bg-blue-50/10'
          }`}
          data-dragging={isDragging || undefined}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            {...getInputProps()}
            aria-label="Nahrát soubory"
            className="sr-only"
          />
          <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
            <div
              aria-hidden="true"
              className="mb-3 flex size-12 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white"
            >
              <ImageIcon className="size-5 text-[#a1a1aa]" />
            </div>
            <p className="mb-1.5 text-sm font-medium text-[#171717]">
              Přetáhněte soubory sem
            </p>
            <p className="text-[#a1a1aa] text-xs">
              Obrázky, logo, fotky realizací (max. {maxSizeMB} MB)
            </p>
            <Button
              className="mt-4"
              onClick={openFileDialog}
              variant="outline"
              type="button"
            >
              <UploadIcon
                aria-hidden="true"
                className="-ms-1 size-4 opacity-60"
              />
              Vybrat soubory
            </Button>
          </div>
        </div>
      </div>

      {/* Error messages */}
      {errors.length > 0 && (
        <div
          className="text-red-500 flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircle className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}

      {/* Uploaded files list */}
      {hasFiles && (
        <div className="space-y-2">
          {files.map((fileWithPreview) => {
            const { id, file, preview } = fileWithPreview
            return (
              <div
                key={id}
                className="relative flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50/50 p-3"
              >
                {preview ? (
                  <img
                    src={preview}
                    alt={file.name}
                    className="size-10 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white">
                    <FileIcon className="size-4 text-[#a1a1aa]" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[#171717]">{file.name}</p>
                  <p className="text-[#a1a1aa] text-xs">
                    {file.size < 1024 * 1024
                      ? `${(file.size / 1024).toFixed(0)} KB`
                      : `${(file.size / 1024 / 1024).toFixed(2)} MB`}
                  </p>
                </div>
                <button
                  onClick={() => removeFile(id)}
                  aria-label={`Odebrat ${file.name}`}
                  className="text-[#a1a1aa] hover:text-red-500 shrink-0 transition-colors duration-200"
                  type="button"
                >
                  <XIcon className="size-4" />
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default FileDropzone
