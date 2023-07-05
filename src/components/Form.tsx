import React, { FormEvent, useState, ChangeEvent } from "react";
import Communities from "../../types/Communities";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Modal from "./Modal/Modal";

const Form = () => {
  const [formValues, setFormValues] = useState<Communities>({
    community_name: "",
    community_description: "",
    community_abbreviation: "",
    community_category: "",
    university: "",
    community_logo: "",
    university_logo: "",
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  //Handles input Onchange event
  const inputHandler =
    (fieldName: keyof Communities) =>
    (
      event: ChangeEvent<
        HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
      >
    ) => {
      const { value } = event.target;
      setFormValues((prevData) => {
        return {
          ...prevData,
          [fieldName]: value,
        };
      });
    };

  const {
    community_description,
    community_name,
    community_category,
    community_abbreviation,
    university,
    community_logo,
    university_logo,
  } = formValues;
  const formHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (
      !(
        community_name &&
        community_description &&
        community_category &&
        university
      )
    ) {
      alert("Please complete the input values");
      return;
    }
    const containsUpperCase = /[A-Z]/;
  
    console.log(university.replace(/\s/g, ""));
    setIsLoading(true);
    try {
      const response = fetch("api/community/add_community", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      const data = await (await response).json();
      console.log(data);
      if (data.Success) {
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="px-4 flex justify-center">
      {isLoading ? <Modal /> : ""}
      <form onSubmit={formHandler} className="w-[60%] text-black">
        {/* Fieldset grouping for the community name and abbreviation */}
        <fieldset className="grid grid-cols-2 gap-4">
          <label className="block text-[20px] my-2">
            Name of Community:
            <input
              onChange={inputHandler("community_name")}
              required
              value={community_name}
              type="text"
              placeholder="Google Developer Student Group"
              className="w-full border pl-4 h-10 rounded-lg"
              name="community_name"
            />
          </label>
          <label className="block text-[20px] my-2">
            Community Abbreviation:
            <input
              onChange={inputHandler("community_abbreviation")}
              required
              value={community_abbreviation}
              type="text"
              placeholder="GDSC"
              className="w-full border pl-4 h-10 rounded-lg"
              name="community_abbreviation"
            />
          </label>
        </fieldset>
        {/* Fieldset grouping for the community image  and university image */}
        <fieldset className="grid grid-cols-2 gap-4">
          <label className="block text-[20px] my-2">
            Community Logo:
            <input
              onChange={inputHandler("community_logo")}
      
              value={community_logo}
              type="text"
              placeholder=""
              className="w-full border pl-4 h-10 rounded-lg"
              name="community_logo"
            />
          </label>
          <label className="block text-[20px] my-2">
            University Logo:
            <input
              onChange={inputHandler("university_logo")}
            
              value={university_logo}
              type="text"
              placeholder=""
              className="w-full border pl-4 h-10 rounded-lg"
              name="university_logo"
            />
          </label>
        </fieldset>

        <label htmlFor="" className="block text-[20px] my-2">
          Select / Create Community Category:
          <input
            list="Communities"
            value={community_category}
            onChange={inputHandler("community_category")}
            className="border block w-full h-10 roundes-sm pl-4 rounded-lg"
          />
          <datalist id="Communities">
            hello
            <option value="Tech">
              Tech(Programming,Coding,DataScience, etc)
            </option>
            <option value="Blockchain">
              Blockchain(web3,Defi,CryptoCurrency)
            </option>
            <option value="Social">Social(Entertainment,school Tv)</option>
            <option value="Finance">Finance</option>
            <option value="CyberSecuity" >CyberSecurity(Ethical Hacker,Cybersec analyst etc)</option>
          </datalist>
         {/*  <select
            onChange={inputHandler("community_category")}
            required
            value={community_category}
            name="community_category"
            className="border block w-full h-10 roundes-sm pl-4 rounded-lg"
          >
            <option value=""></option>
            <option value="Tech">
              Technology(Programming,Coding,DataScience, etc)
            </option>
            <option value="Blockchain">
              Blockchain(web3,Defi,CryptoCurrency)
            </option>
            <option value="Social">Social(Entertainment,school Tv)</option>
            <option value="Finance">Finance</option>
          </select> */}
        </label>

        <label htmlFor="" className="text-[20px] my-2">
          University:
          <input
            onChange={inputHandler("university")}
            required
            value={university}
            type="text"
            className="border block w-full h-10 pl-4 rounded-lg"
            placeholder="Unn"
            name="university"
          />
        </label>
        <label htmlFor="" className="block text-[20px] my-2">
          Community Description:
          <textarea
            onChange={inputHandler("community_description")}
            required
            value={community_description}
            name="community_description"
            id=""
            cols={30}
            rows={5}
            className="border block resize-none w-full pl-4 rounded-lg text-black"
          ></textarea>
        </label>
        <label className="w-full text-center block">
          <button
            type="submit"
            className="outline outline-2 outline-[green] p-2 rounded-lg  w-[80%] text-[20px] hover:bg-green-700 hover:text-white"
          >
            {" "}
            Create-Community
          </button>
        </label>
      </form>
    </section>
  );
};

export default Form;
