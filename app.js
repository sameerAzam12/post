  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getFirestore,  collection, addDoc ,getDocs, doc ,updateDoc,deleteDoc} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
  import { getStorage, ref, uploadBytes , getDownloadURL,deleteObject} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js";

  
  // TODO: Add SDKs for Firebase products that you want to use

  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCW93XFyu1agGP08IFaD-XyWsulyDYBbto",
    authDomain: "practice-afa4a.firebaseapp.com",
    projectId: "practice-afa4a",
    storageBucket: "practice-afa4a.appspot.com",
    messagingSenderId: "589081704355",
    appId: "1:589081704355:web:ddc820b029377c0f6a4c16",
    measurementId: "G-68060WNCGN"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);
  document.getElementById('btn').addEventListener('click',async()=>{

    var texts=document.getElementById('text').value
    var desc=document.getElementById('desc').value
    var file=document.getElementById('files').files
   

try {
  const docRef = await addDoc(collection(db, "sameer"), {
   texts:texts,
   desc:desc
  });
  console.log("Document written with ID: ", docRef.id);
  alert('done')
 

const storageRef = ref(storage, "texts");

// 'file' comes from the Blob or File API
uploadBytes(storageRef, file[0]).then((snapshot) => {
  console.log('Uploaded a blob or file!');
});
} catch (e) {
  console.error("Error adding document: ", e);
}
  })

 


  
  
  
  var div=document.getElementById('sec')

  const querySnapshot = await getDocs(collection(db, "sameer"));
  querySnapshot.forEach((doc) => {

    div.innerHTML = `<div><button onclick=delimg("${doc.id}")>DeleteImage</button> </div>` 

      getDownloadURL(ref(storage, 'texts'))
        .then((url) => {
         
          // Or inserted into an <img> element
          const img = document.getElementById('myimg');
          img.setAttribute('src', url);
        })
        .catch((error) => {
          // Handle any errors
        });
 //   console.log(`${doc.id} =>`);
 div.innerHTML += `   <div><h2>${doc.data().texts}</h2>
            <p>${doc.data().desc}</p>
 
 <button onclick=edit("${doc.id}")>edit</button>
 <button onclick=deletea("${doc.id}")>delete</button>
 </div> 
 `
 
 });

 async function edit(id) 
{

    const list = doc(db, "sameer", id);
    
    let updatetext = prompt('update text')
    let updatedesc = prompt('enter description')
    await updateDoc(list, {
    texts:updatetext,
    desc:updatedesc
})
.then(()=>
{

window.location.reload()

})

    
}

let  deletea =  async (id) =>{
  
  
  await deleteDoc(doc(db, "sameer", id))
  
  .then(()=>{
    window.location.reload();
  });
  
}
window.deletea=deletea
window.edit=edit






function delimg(id) {
    const desertRef = ref(storage, 'texts');
    
    // Delete the file
    deleteObject(desertRef).then(() => {
      // File deleted successfully
    }).catch((error) => {
      // Uh-oh, an error occurred!
    });
    window.location.reload()
 

}
window.delimg = delimg