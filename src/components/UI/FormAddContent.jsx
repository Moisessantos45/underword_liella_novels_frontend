import { useState } from "react";

const FormAddContent = ({ onChange }) => {
  const [numberOfInputs, setNumberOfInputs] = useState(0);
  const [inputValues, setInputValues] = useState([]);

  const handelClickAddInput = () => {
    setNumberOfInputs((prev) => prev + 1);
  };

  const changeHandleInputs = (index, fileName, value) => {
    setInputValues((prev) => {
      const newState = [...prev];
      let newStateIndex = newState[index];

      if (newStateIndex === undefined) {
        newStateIndex = {};
        newState[index] = newStateIndex;
      }

      newStateIndex[fileName] = value;
      onChange(newState);
      return newState;
    });
  };

  const handelClickDeleteInput = (index) => {
    setNumberOfInputs((prev) => prev - 1);
    const newInputs = inputValues.filter((_, i) => i !== index);
    onChange(newInputs);
    setInputValues(newInputs);
  };

  return (
    <div className="form_add_content p-5">
      <div className="sm:w-full px-4 flex items-center flex-wrap sm:justify-start justify-evenly gap-2">
        <span className="text-sm flex font-medium text-gray-100 textWidthFitContent">
          Agregar Links
        </span>
        <span className="flex font-medium text-gray-100 textWidthFitContent">
          <i
            className="fa-solid fa-plus cursor-pointer text-xl"
            onClick={handelClickAddInput}
          ></i>
        </span>
      </div>

      <div className=" w-full m-auto border-b border-gray-400 border-opacity-20">
        {Array.from({ length: numberOfInputs }, (item, index) => (
          <article
            key={index}
            className=" gap-2 w-full justify-evenly items-center p-3 grid md:grid-cols-3 md:grid-rows-2 grid-cols-1 md:gap-2 m-auto relative"
          >
            <i
              className="fa-solid fa-minus font-bold text-slate-300 text-3xl absolute right-2 md:-top-3 -top-4 cursor-pointer"
              onClick={() => handelClickDeleteInput(index)}
            ></i>
            <input
              className="py-4 px-3 md:col-start-2 md:col-span-2 md:row-start-1 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-green-500 rounded-lg"
              id="formInput1-1"
              type="text"
              placeholder="link de descarga"
              value={(inputValues[index] && inputValues[index].link) || ""}
              name="link"
              onChange={(e) =>
                changeHandleInputs(index, "link", e.target.value)
              }
            />
            <input
              className="py-4 px-3 md:col-span-3 md:row-start-2 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-green-500 rounded-lg"
              id="formInput1-1"
              type="text"
              placeholder="texto"
              value={(inputValues[index] && inputValues[index].texto) || ""}
              name="content"
              onChange={(e) =>
                changeHandleInputs(index, "texto", e.target.value)
              }
            />
          </article>
        ))}
      </div>
    </div>
  );
};

export default FormAddContent;
