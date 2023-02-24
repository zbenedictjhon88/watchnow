import  secureLocalStorage  from  "react-secure-storage";

export function setLocalStorage(key, value){
    secureLocalStorage.setItem(key, value);
}

export function getLocalStorage(key){
    return secureLocalStorage.getItem(key);
}

export function clearLocalStorage(){
    return secureLocalStorage.clear();
}