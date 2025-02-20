import { HardHat } from "lucide-react";

const CreateSubContractedWorks = () => {
  return (
    <div className="py-6">
      <div className="w-[300px] md:w-[500px] mx-auto bg-white p-6 md:p-8 rounded-lg shadow-2xl border-2 border-[#2ECC71]">
        <div className="flex flex-col gap-1 items-center mb-8">
          <HardHat className="text-blue mb-2" size={30} />
          <h2 className="text-2xl md:text-3xl text-center font-bold text-blue">Create Subcontracted Works</h2>
        </div>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="task-title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Task Title
            </label>
            <input
              type="text"
              id="task-title"
              className="project-modal-input"
            />
          </div>
          <div>
            <label
              htmlFor="task-description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Task Description
            </label>
            <textarea
              id="task-description"
              rows={3}
              className="project-modal-input"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="task-cost-labor"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Task Cost Labour
            </label>
            <input
              type="number"
              id="task-cost-labour"
              className="project-modal-input"
            />
          </div>
          <div>
            <label
              htmlFor="task-cost-overhead"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Task Cost Overhead
            </label>
            <input
              type="text"
              id="task-cost-overhead"
              className="project-modal-input"
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-[#2ECC71] text-white p-2 rounded-lg hover:bg-green-800 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSubContractedWorks;
