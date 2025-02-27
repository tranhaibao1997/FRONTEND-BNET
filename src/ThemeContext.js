import React, { useState } from 'react'


export const StoreContext = React.createContext(null);

export default ({ children }) => {
    // các em đã vào nhà kho
    const [navBarAppear, setNavBarAppear] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [gender, setGender] = useState(null)
    const [minAge, setMinAge] = useState(0);
    const [maxAge, setMaxAge] = useState(100);
    const [shareModal, setShareModal] = useState(false)
    const [sharePostId, setSharePostId] = useState(null)
    const [editModal, setEditModal] = useState(false)
    const [editPostId, setEditPostId] = useState(null)








    const store = {
        navBarAppear: [navBarAppear, setNavBarAppear],
        gender: [gender, setGender],
        minAge: [minAge, setMinAge],
        maxAge: [maxAge, setMaxAge],
        currentPage: [currentPage, setCurrentPage],
        shareModal: [shareModal, setShareModal],
        sharePostId: [sharePostId, setSharePostId],
        editModal: [editModal, setEditModal],
        editPostId: [editPostId, setEditPostId]

    };


    return ( < StoreContext.Provider value = { store } > { children } < /StoreContext.Provider>);
    };