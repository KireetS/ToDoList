import React from "react";

export const Todo = (props) => {
  let id = props.id;

  const handleDeleteTodo = async () => {
    try {
      await props.onDelete(id);
    } catch (err) {
      console.error("Error deleting your todo item , the error is ", err);
    }
  };
  return (
    <>
      <div className="d-flex flex-column align-items-center my-3 ml-3">
        <div style={{ width: "70%" }}>
          <div className="card text-center">
            <div className="card-body d-flex justify-content-between align-items-center">
              <h5 className="card-title">{props.item}</h5>
              <button
                className="btn btn-primary btn-danger"
                style={{ borderRadius: "100%" , fontSize : "100%"}}
                onClick={handleDeleteTodo}
              >
                &#x2613;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
