import React, { useState } from 'react';
import { getBookImages } from '../services/api';
import config from '../config';
    
function BookItem({ book }) {
    const [modalObert, setModalObert] = useState(false);
    const [imatges, setImatges] = useState([]);
    const [carregantImatges, setCarregantImatges] = useState(false);
    
    function mostraDetalls() {
        setCarregantImatges(true);
        getBookImages(book.id).then((data) => {
            setImatges(data);
            setCarregantImatges(false);
        });
        setModalObert(true);
    }
    
    function tancaModal() {
        setModalObert(false);
    }
    
    return (
        <div className="book-card">
            {book.imatge && (
                <div className="book-image-container">
                    <img src={book.imatge} alt={book.titol} className="book-image" />
                </div>
            )}
            <h3>{book.titol}</h3>
            <p>
            <strong>Autor:</strong> {book.autor}
            </p>
            <button onClick={mostraDetalls}>Detalls</button>
    
            {/* Modal */}
            {modalObert && (
            <div className="modal-overlay" onClick={tancaModal}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{book.titol}</h2>
                    <button className="close-btn" onClick={tancaModal}>×</button>
                </div>
                <div className="modal-body">
                    <p><strong>Autor:</strong> {book.autor}</p>
                    <p><strong>Data d'edició:</strong> {book.data_edicio || 'No disponible'}</p>
                    <p><strong>Gènere:</strong> {book.genere || 'No disponible'}</p>
                    <p><strong>Resum:</strong> {book.resum || 'Sense descripció'}</p>
                    
                    {/* Imatge principal */}
                    {book.imatge && (
                        <div className="modal-main-image">
                            <h4>Portada</h4>
                            <img src={book.imatge} alt={book.titol} className="modal-image" />
                        </div>
                    )}
                    
                    {/* Imatges addicionals */}
                    {carregantImatges ? (
                        <p>Carregant imatges...</p>
                    ) : imatges.length > 0 ? (
                        <div className="modal-additional-images">
                            <h4>Altres imatges</h4>
                            <div className="images-grid">
                                {imatges.map((img, index) => (
                                    img.imatge && (
                                        <div key={img.id} className="image-item">
                                            <img 
                                                src={img.imatge} 
                                                alt={`Imatge ${index + 1}`}
                                                className="thumbnail"
                                            />
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="no-images">No hi ha imatges addicionals</p>
                    )}
                </div>
                <div className="modal-footer">
                    <button onClick={tancaModal}>Tancar</button>
                </div>
                </div>
            </div>
            )}
        </div>
    );
}
    
export default BookItem;