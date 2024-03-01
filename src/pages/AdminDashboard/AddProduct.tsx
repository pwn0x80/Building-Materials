import React, { useEffect, useState, createContext, ReactNode, useContext } from 'react'
import { UseFormRegisterReturn, UseFormRegister, UseFormWatch } from 'react-hook-form'
import { useForm } from 'react-hook-form'
const PhotoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
  </svg>

)
interface YourFormData {
  productName?: string;
  productDescription?: string;
  productPrice?: string;
  category?: string;
  productStatus?: string
  selectProductImages?: FileList
}
interface IProduct {
  // register: (name: string, options?: Record<string, any>) => void;

  register: UseFormRegister<YourFormData>; // Replace YourFormData with your form data type
}

interface TWatch {
  watch: UseFormWatch<YourFormData>;
}
const CrossIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
)
const ProductImages: React.FC<IProduct & TWatch> = ({ watch, register }) => {
  const { imageState, setImage } = useContext(ImageCreateContext);

  let watchImage = watch("selectProductImages")
  useEffect(() => {
    if (!watchImage) return;
    let tmpImg: Record<string, File> = {}; // Make sure tmpImg has the correct type
    for (let i = 0; i < watchImage.length; i++) {
      const file = watchImage[i];
      const imgUrl = URL.createObjectURL(file);
      tmpImg = {
        // ...imageState,
        ...tmpImg,
        [imgUrl]: file,
      };
    }
    setImage(tmpImg);
  }, [watchImage]);
  return (
    <div className='bg-red-400 rounded '>
      <div className='font-extrabold p-2' >
        Product Image
      </div>
      <div className='overflow-scroll mx-2 overflow-y-hidden'>
        <div className='max-w-64 gap-2 h-60 flex items-center '>
          <label htmlFor='selectProductImage'
            className=' flex p-5 flex-wrap items-center  min-w-[250px] h-[240px] bg-gray-500'>
            <div className='flex flex-col items-center'>
              <div className=''>
                <PhotoIcon />
                <input id="selectProductImage"
                  {...register('selectProductImages')}
                  multiple
                  hidden
                  type="file" w-10 h-10 ></input>

              </div>
              <div>Drop your image here, or select click to browse</div>
            </div>
          </label>
          {Object.keys(imageState).map((img, index) => (

            <div key={index} className='relative min-w-[250px] h-[240px] bg-gray-500'>
              <div className='absolute right-0 top-0'><CrossIcon /></div>
              <img className='w-full h-full' src={img} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
const ProductStatus: React.FC<IProduct> = ({ register }) => {
  return (
    <div className='bg-green-400 rounded p-2 '>
      <div className='font-extrabold pb-2'>
        Status
      </div>
      <select
        {...register("productStatus", {
          required: { value: true, message: "required product name" },
        })}
        className='w-full h-8'>
        <option disabled value="">Please choose an option</option>
        <option value="enable" selected>Show Case To User</option>
        <option value="disable">Dont Show Case To User</option>
      </select>
    </div>
  )
}
const ProductDiscription: React.FC<IProduct> = ({ register }) => {

  return (
    <div className=' bg-gray-500'>
      <div>Product Detail</div>
      <div>
        <label htmlFor="productName">Product Name</label>
        <div>
          <input
            {...register("productName", {
              required: { value: true, message: "required product name" },
            })}

            id="productName" type="text" placeholder='Enter the Product Name' />
        </div>
      </div>
      <div>
        <label htmlFor='productDescription' > Product Discription</label>
        <div className=''>
          <textarea
            {...register("productDescription", {
              required: { value: true, message: "Enter product Discription" }
            })}
            id="productDescription" />
        </div>
      </div>
      <div>
        <label htmlFor='productPrice' > Product Price</label>
        <div className=''>
          <input
            {...register("productPrice", {
              required: { value: true, message: "required Product Price" },
            })}
            type="number" id="productPrice" />
        </div>
      </div>
      <div>
        category
        <input
          {...register("category", {
            required: { value: true, message: "required category" },
          })}
          type="text"></input>
      </div>

      <div>
        <button className='bg-green-400 rounded px-3 py-1'> submit</button>
      </div>
    </div>
  )
}

const AddProductContext = (props: {}) => {
  const { watch, register, handleSubmit, formState: { errors } } = useForm();
  const { imageState } = useContext(ImageCreateContext);
  const onSubmit = (formData: any) => {
    let form = new FormData()
    for (let data of Object.entries(formData)) {
      if (data[0] === 'selectProductImages') continue
      if (typeof (data[1]) === 'string')
        form.append(data[0], data[1])
    }
    for (let file of Object.entries(imageState)) {
      form.append('itemImg', file[1]);
    }
    fetch("http://127.0.0.1:8000/admin/addProduct", {
      method: "POST",
      body: form,
    })
  }
  return (
    <div className=' '>
      <div className='ps-4 py-1 bg-[#efefef] w-full  text-2xl capitalize font-extrabold'>
        Create a New Product
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='mx-3 gap-3 grid grid-cols-[1fr_3fr]'>
        <div className='grid gap-2'>
          <ProductImages watch={watch} register={register} />
          <ProductStatus register={register} />
        </div>
        <div>
          <ProductDiscription register={register} />
        </div>
      </form>
    </div>
  )
}
export const AddProduct = () => {

  return (
    <>
      <ImageContextProvider>
        <AddProductContext />
      </ImageContextProvider>
    </>
  )
}


interface ImageContextProps {
  imageState: Record<string, File>; // Change the type to Record<string, File>
  setImage: React.Dispatch<React.SetStateAction<Record<string, File>>>;
}

const ImageCreateContext = createContext<ImageContextProps>({
  imageState: {},
  setImage: () => { },
});
const ImageContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [imageState, setImage] = useState<Record<string, File>>({}); // Initialize with an empty object

  const contextValue: ImageContextProps = { imageState, setImage };

  return (
    <ImageCreateContext.Provider value={contextValue}>
      {children}
    </ImageCreateContext.Provider>
  );
};

