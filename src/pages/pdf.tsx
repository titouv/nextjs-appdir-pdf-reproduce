import { useState } from "react"
import PDFReader from "@/components/PDFReader"

function App() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setPdfFile(file)
  }

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <PDFReader pdfFile={pdfFile} />
    </div>
  )
}

export default App
