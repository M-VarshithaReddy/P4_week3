import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="container">
            <div className="row">
              {products?.map((p) => (
                <div key={p._id} className="col-md-4 mb-3">
                  <Link to={`/dashboard/admin/product/${p.slug}`} className="product-link">
                    <div className="card" style={{ width: "100%", height: "400px" }}>
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          
                        }}
                      />
                      <div className="card-body" style={{ height: "100px" }}>
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description.substring(0, 50)}...</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
