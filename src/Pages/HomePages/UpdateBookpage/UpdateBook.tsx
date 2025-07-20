import { useEffect } from "react";
import { useParams } from "react-router";

const UpdateBook = () => {
    const {id} = useParams()
    console.log(id);
   useEffect(()=>{
      fetch(`http://localhost:5000/api/books/${id}`)
      .then(res => res.json())
      .then(data => console.log(data)
      )
   },[id])
    return (
        <div>
            this is update book page
        </div>
    );
};

export default UpdateBook;