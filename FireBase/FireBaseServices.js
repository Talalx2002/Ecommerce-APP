import { db } from './FireBaseConfig'; 
import { collection, addDoc ,getDocs } from 'firebase/firestore';
import{ref,uploadBytes,getDownloadURL,listAll} from "firebase/storage";
import {storage} from './FireBaseConfig'; 

// Add data to a collection create new doc with random id
export const addDataToCollection = async (collectionName, data) => {
  try {
    const collectionRef = collection(db, collectionName);
    await addDoc(collectionRef, data);
    console.log('Data added successfully!');
  } catch (error) {
    console.error('Error adding data: ', error);
  }
};

// accept collection name and return all documents in that collection
export const retrieveAllDocuments = async (collectionName) => {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const documents = [];
      querySnapshot.forEach((doc) => {
        documents.push({
          id: doc.id,
          data: doc.data(),
        });
      });
  
      return documents;
    } catch (error) {
      console.error('Error retrieving documents:', error);
      return [];
    }
  };
  
 export  const getImageUrlsFromFolder = async (folderName) => {
    const folderRef = ref(storage, folderName);
    try {
      const res = await listAll(folderRef);
      const urlPromises = res.items.map((itemRef) => getDownloadURL(itemRef));
      const urls = await Promise.all(urlPromises);
      return urls;
    } catch (error) {
      console.error('Error fetching image URLs:', error);
      return [];
    }
  };


  // Assuming addDataToCollection function is a wrapper around Firestore's add functionality

export const addSubCollection = async (collectionName, subCollectionName ,data , subData) => {
    try {
      const collectionRef = collection(db, collectionName);
      const docRef = await addDoc(collectionRef, data);
      console.log('Data added successfully in doc!');
      console.log(docRef.id);
      const subCollectionRef = collection(db, collectionName, docRef.id, subCollectionName);
      subData.products.forEach(async (element) => {
        await addDoc(subCollectionRef, element);
      });
      console.log('Data added successfully in sub-collection!');
    } catch (error) {
      console.error('Error adding data: ', error);
    }

  };


  export const retrieveAllSubCollection = async (collectionName, subCollectionName) => {
    try {
      const mainCollectionDocs = await retrieveAllDocuments(collectionName);
      const subCollectionDocuments = [];
      const subCollectionPromises = mainCollectionDocs.map(async (doc) => {
        const subCollectionRef = collection(db, collectionName, doc.id, subCollectionName);
        const subCollectionSnapshot = await getDocs(subCollectionRef);
        subCollectionSnapshot.forEach((subDoc) => {
          subCollectionDocuments.push({
            id: subDoc.id,
            data: subDoc.data(),
          });
        });

        return subCollectionDocuments;
      });
      const datacollection = await Promise.all(subCollectionPromises);
      console.log(datacollection);
      return datacollection;
    } catch (error) {
      console.error('Error retrieving subcollection documents:', error);
      return [];
    }
  };
  