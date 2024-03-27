import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <label>Category Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter new category"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-3">
                    Submit
                </button>
            </form>
        </>
    );
};

export default CategoryForm;