const housings =()=>{
    const url='https://www.juegaenlinea.com/'
 return(

    <div>
    <h2>Preview de la página web:</h2>
    <iframe
      src={url}
      title="Web Preview"
      style={{ width: '100%', height: '500px', border: '1px solid #ccc' }}
    />
  </div>
 )


    
}
export default housings;

