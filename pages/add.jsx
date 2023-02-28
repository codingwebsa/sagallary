import { CrossIcon, UploadIcon } from "@/icons";
import { useRef, useState } from "react";
import { Switch } from "@headlessui/react";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { postsCollection } from "@/lib/firebase";
import { getSession } from "next-auth/react";
import { Triangle } from "react-loader-spinner";

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

const Add = ({ session }) => {
  const [localImage, setLocalImage] = useState(null);
  const [file, setFile] = useState(null);
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const fileInp = useRef();
  const formRef = useRef();

  async function handleChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.addEventListener("load", () => {
      // Base64 Data URL 👇
      setLocalImage(reader.result);
    });

    reader.readAsDataURL(file);
    setFile(file);
  }

  async function UploadImage(e) {
    setLoading(true);
    e.preventDefault();

    const _title = formRef.current.title.value || "";
    const _tags = formRef.current.tags.value || "";
    const _public = enabled || true;

    // upload image
    const formdata = new FormData();

    formdata.append("file", file);
    formdata.append("upload_preset", "vpxqc8bq");
    formdata.append("cloud_name", "dsvxr15fj");

    const imagedata = await fetch(
      "https://api.cloudinary.com/v1_1/dsvxr15fj/image/upload",
      {
        method: "POST",
        body: formdata,
      }
    ).then((r) => r.json());

    console.log("upload successful 😪");

    if (!imagedata) return;

    // firebase
    try {
      const docRef = await addDoc(postsCollection, {
        title: _title,
        tags: _tags,
        public: _public,
        imageurl: imagedata.secure_url,
        authorEmail: session.user.email,
        authorName: session.user.name,
        authorImage: session.user.image,
        timestamp: serverTimestamp(),
      });
      console.log("done!! 🚀");
    } catch {}

    setLoading(false);
    setFile(null);
    setLocalImage(null);
  }

  return (
    <>
      {loading && (
        <>
          <div className="fixed inset-0 bg-white/80 grid place-content-center z-[99999]">
            <Triangle
              height="160"
              width="160"
              color="rgb(79 70 229)"
              ariaLabel="triangle-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        </>
      )}
      <div className="px-2 max-w-3xl mx-auto">
        {file ? (
          <>
            <div className="relative">
              <img src={localImage} className="rounded-md w-full" alt="" />
              <button
                onClick={() => setLocalImage(null)}
                className="bg-white p-3 rounded-full absolute top-4 right-4"
              >
                <CrossIcon size={20} className="text-black" />
              </button>
            </div>
            <form className="mt-20 mb-40" onSubmit={UploadImage} ref={formRef}>
              <div className="my-2 flex flex-col">
                <span className="mb-2 font-semibold text-lg">Title</span>
                <input
                  className="px-8 py-4 border w-[80%]"
                  type="text"
                  name="title"
                  placeholder="Exm: Cool looking cat with an Umbrella"
                  required
                />
              </div>
              <div className="my-2 flex flex-col">
                <span className="mb-2 font-semibold text-lg">Tags</span>
                <input
                  className="px-8 py-4 border w-[80%]"
                  type="text"
                  name="tags"
                  placeholder="Exm: cute cats, pets and cats"
                />
              </div>
              <div className="flex gap-3 my-4">
                <p>Private</p>
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={`${
                    enabled ? "bg-blue-600" : "bg-gray-200"
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span className="sr-only">Enable notifications</span>
                  <span
                    className={`${
                      enabled ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
                <p>Public</p>
              </div>

              <button
                className="my-8 py-4 text-white font-bold text-lg rounded-lg bg-indigo-700 px-10"
                type="submit"
              >
                Post
              </button>
            </form>
          </>
        ) : (
          <UploadComponent handleChange={handleChange} fileInp={fileInp} />
        )}
      </div>
    </>
  );
};

export default Add;

const UploadComponent = ({ handleChange, fileInp }) => (
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
