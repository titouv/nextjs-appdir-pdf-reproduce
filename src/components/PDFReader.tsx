"use client"

import { useEffect, useState } from "react"
import * as pdfjs from "pdfjs-dist"
import { TextItem } from "pdfjs-dist/types/src/display/api"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const PDFReader = ({ pdfFile }: { pdfFile: File | null }) => {
  const [content, setContent] = useState<string>("")

  useEffect(() => {
    const fetchData = async () => {
      if (!pdfFile) return

      const fileReader = new FileReader()
      fileReader.onload = async function (e) {
        const typedArray = new Uint8Array(e.target!.result as ArrayBuffer)
        const pdf = await pdfjs.getDocument(typedArray).promise
        let accumulatedText = ""

        for (let i = 1; i <= pdf._pdfInfo.numPages; i++) {
          const page = await pdf.getPage(i)
          const content = await page.getTextContent()
          const text = content.items
            .map((item) => {
              const realItem = item as TextItem
              return realItem.str
            })
            .join(" ")
          accumulatedText += text + "\n"
        }

        setContent(accumulatedText)
      }
      fileReader.readAsArrayBuffer(pdfFile)
    }

    fetchData()
  }, [pdfFile])

  return (
    <div>
      <pre>{content}</pre>
    </div>
  )
}
export default PDFReader
