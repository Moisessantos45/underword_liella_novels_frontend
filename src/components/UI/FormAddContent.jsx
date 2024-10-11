import { useState, useEffect, useCallback, memo } from "react";
import useAdmin from "@/hooks/useAdmin";

const FormAddContent = ({ onChange, initialValues = [] }) => {
  const { activeDark } = useAdmin();
  const [inputs, setInputs] = useState(initialValues);

  const handleClickAddInput = useCallback(() => {
    setInputs((prev) => [...prev, { link: "", texto: "" }]);
  }, []);

  const handleInputChange = useCallback((index, field, value) => {
    setInputs((prev) => {
      const newInputs = [...prev];
      newInputs[index] = { ...newInputs[index], [field]: value };
      return newInputs;
    });
  }, []);

  const handleClickDeleteInput = useCallback((index) => {
    setInputs((prev) => prev.filter((_, i) => i !== index));
  }, []);

  useEffect(() => {
    onChange(inputs);
  }, [inputs, onChange]);

  useEffect(() => {
    setInputs(initialValues);
  }, [initialValues]);

  return (
    <div className="flex w-full sm:w-12/12 flex-col sm:p-5 p-1">
      <div className="sm:w-full px-4 flex items-center flex-wrap sm:justify-start justify-evenly gap-2">
        <span
          className={` ${
            activeDark ? "text-gray-100" : "text-gray-600 "
          } text-sm flex font-medium textWidthFitContent`}
        >
          Agregar Links
        </span>
        <span
          className={`flex font-medium ${
            activeDark ? "text-gray-100 " : "text-gray-600 "
          } textWidthFitContent`}
        >
          <i
            className="fa-solid fa-plus cursor-pointer text-xl"
            onClick={handleClickAddInput}
          ></i>
        </span>
      </div>

      <div className="w-full m-auto border-b border-gray-400 border-opacity-20">
        {inputs.length > 0 &&
          inputs.map((input, index) => (
            <article
              key={index}
              className="gap-2 w-full justify-evenly items-center p-3 grid md:grid-cols-3 md:grid-rows-2 grid-cols-1 md:gap-2 m-auto relative"
            >
              <i
                className="fa-solid fa-minus font-bold text-slate-300 text-3xl absolute right-2 md:-top-3 -top-4 cursor-pointer"
                onClick={() => handleClickDeleteInput(index)}
              ></i>

              <div className="md:col-start-1 md:col-span-3 md:row-start-1 w-full">
                <label htmlFor={`link-${index}`} className="sr-only">
                  Link de descarga
                </label>
                <input
                  id={`link-${index}`}
                  className="sm:py-4 py-2 px-3 w-full text-sm text-gray-800 placeholder-gray-50 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-green-500 rounded-lg"
                  type="text"
                  placeholder="Link de descarga"
                  value={input.link}
                  onChange={(e) =>
                    handleInputChange(index, "link", e.target.value)
                  }
                />
              </div>

              <div className="md:col-span-3 md:row-start-2 w-full">
                <label htmlFor={`texto-${index}`} className="sr-only">
                  Texto
                </label>
                <input
                  id={`texto-${index}`}
                  className="sm:py-4 py-2 px-3 w-full text-sm text-gray-800 placeholder-gray-50 font-medium outline-none bg-transparent border border-gray-400 hover:border-white focus:border-green-500 rounded-lg"
                  type="text"
                  placeholder="Texto"
                  value={input.texto}
                  onChange={(e) =>
                    handleInputChange(index, "texto", e.target.value)
                  }
                />
              </div>
            </article>
          ))}
      </div>
    </div>
  );
};

export default memo(FormAddContent);
