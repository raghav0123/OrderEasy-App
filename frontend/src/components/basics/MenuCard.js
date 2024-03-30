import React from 'react'
import { Link } from "react-router-dom";
const MenuCard = ({ menuData }) => {
    // console.log(menuData)
    
    return (<>
        <section className='main-card--cointainer '  >
            {menuData?.map((p) => {
                
                return (
                    <>

                        <div className='card-container' key={p._id} style={{
                     boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                        }}>
                            <div className='card'>
                                <div className='card-body'>
                                   
                                    <h2 className='card-title' style={{
                                        fontSize:"39px"
                        }}>{p.name}  </h2>
                                    <span className='card-author  '>{p.category.name}</span>
                                    <span className='card-description subtle'>
                                        {p.description}
                                    </span>
                                    <div className='card-read'> Read</div>
                                </div>
                                {<img src={`http://localhost:9002/api/v1/product/product-photo/${p._id}`} alt='images' className='card-media'></img>}
                                <span className='card-tag subtle'>Order Now</span>

                            </div>
                        </div>
                  
                    </>

                )
            })}
        </section>
    </>
    );
};

export default MenuCard
