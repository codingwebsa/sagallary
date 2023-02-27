import { UploadIcon } from "@/icons";
import { useRef, useState } from "react";

const Add = () => {
  const [localImage, setLocalImage] = useState(null);
  const fileInp = useRef();

  async function handleChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    console.log(file);

    const formdata = new FormData();

    formdata.append("file", file);
    formdata.append("upload_preset", "vpxqc8bq");
    formdata.append("cloud_name", "dsvxr15fj");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dsvxr15fj/image/upload",
      {
        method: "POST",
        body: formdata,
      }
    ).then((r) => r.json());

    console.log(data);
  }
  return (
    <>
      <div className="grid place-content-center h-[100svh]">
        <label
          className="bg-sky-100 p-8 rounded-full text-blue-700"
          htmlFor="fileInp"
        >
          <UploadIcon size={100} />
        </label>
        <input
          type="file"
          id="fileInp"
          accept="image/*"
          ref={fileInp}
          onChange={handleChange}
          hidden
        />
      </div>
    </>
  );
};

export default Add;
