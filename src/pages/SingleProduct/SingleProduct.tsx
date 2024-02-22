import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import { SingleProductDetailCard } from '@components/Product/SingleProductDetailCard';



function fallbackRender({ error, resetErrorBoundary }: any) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}


export const SingleProduct = (props: {}) => {


  return (
    <div className='pt-[86px] container'>
      <ErrorBoundary fallbackRender={fallbackRender}>
        <SingleProductDetailCard/>
      </ErrorBoundary>
    </div >
  )

}

