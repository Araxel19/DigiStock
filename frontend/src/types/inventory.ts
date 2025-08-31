export interface Product {
  id: string
  code: string
  name: string
  description?: string
  price: number
  stock: number
  category?: string
  location?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Planilla {
  id: string
  fileName: string
  filePath: string
  status: 'pending' | 'processing' | 'processed' | 'error'
  ocrData?: any
  extractedProducts?: any
  errorMessage?: string
  processedAt?: string
  createdAt: string
  updatedAt: string
}