import { useState } from 'react'
import '../styles/upload.css'
import { MdCloudUpload, MdOutlineClose } from 'react-icons/md'

function Uploader() {

    const [image, setImage] = useState(null)
    const [fileName, setFileName] = useState("No selected file")
    return (
        <main>
            <form className='uploadImage'
                onClick={() => document.querySelector(".input-field").click()}
            >
                <input type="file" accept='.xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf' className='input-field' hidden
                    onChange={({ target: { files } }) => {
                        files[0] && setFileName(files[0].name)
                        if (files) {
                            setImage(URL.createObjectURL(files[0]))
                        }
                    }}
                />

                {image ?
                    <img src={image} width={150} height={150} alt={fileName} />
                    :
                    <>
                        <MdCloudUpload color='#000' size={60} />
                        <p className='text-center'>Browse Files to upload</p>
                    </>
                }

            </form>
            <section className='uploaded-row'>
                {/* <AiFillFileImage color='#1475cf' /> */}
                <span className='upload-content'>
                    {fileName === "No selected file" || fileName === "No selected File" ? "" :
                        <MdOutlineClose
                            size={25}
                            onClick={() => {
                                setFileName("No selected File")
                                setImage(null)
                            }}
                        />
                    }
                </span>
            </section>
            <p className='size16500 text-center mt-3'>{fileName}</p>

        </main>
    )
}

export default Uploader