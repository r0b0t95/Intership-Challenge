import React from 'react'
import './FooterPage.css'

const MyFooterPage = () => {

    return (
        <div className="container footer">
            <footer className="d-flex justify-content-center align-items-center">
                <p className="text-center">© 2025 Robert Chaves Perez</p>
            </footer>
        </div>
    );
}

export const FooterPage = () => {
  return (
    <div>
        <MyFooterPage />
    </div>
  )
}
