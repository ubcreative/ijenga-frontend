import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../reducers/store";
import { fetchSubcontractedWorkDetails } from "../reducers/subcontractedWorksReducer";
import { fetchLabourers } from "../reducers/labourerReducer";
import { fetchProofOfWorks } from "../reducers/proofOfWorksReducer";
import AddLaborerDetails from "../components/AddLaborerDetails";
import Loader from "../components/Loader";
import { FaTrashCan } from "react-icons/fa6";
import { BadgeCheck, CircleCheck, CircleDollarSign } from "lucide-react";
import EditLaborerDetails from "../components/EditLaborerDetails";
import Sidebar from "../components/Sidebar";
import ProofOfWorkModal from "../components/proofOfWorkModal";
import { constants  } from "../helpers/constants";

export default function SubcontractedWorkDetails() {
  const params = useParams();
  const { projectId, id: workId } = params as { projectId: string; id: string };
  const dispatch = useDispatch<AppDispatch>();
  const { selectedWork, loading } = useSelector((state: RootState) => state.subcontractedWorks);
  const { labourers = [] } = useSelector((state: RootState) => state.labourers)
  const proofOfWorks = useSelector((state: RootState) => state.proofOfWorks.proofOfWorks || []);
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchLabourers(workId));
    dispatch(fetchProofOfWorks(workId));
  }, [dispatch, workId, projectId]);
  
  useEffect(() => {
    if (projectId && workId) {
      dispatch(fetchSubcontractedWorkDetails({ projectId, workId }));
    } else {
      console.error("Missing Project ID or Work ID");
    }
  }, [dispatch, projectId, workId]);

  useEffect(() => {
    console.log("Selected Work Details in Redux:", selectedWork);
  }, [selectedWork]);

  if (loading) return <Loader />;
  if (!selectedWork) return <p>Subcontracted work not found</p>;
  
  const handleRemoveLaborer = () => {
    console.log("Remove laborer clicked");
  };

  // Handle approve works
  const handleApproveWorks = () => {
    console.log("Approve works clicked");
  };

  // Handle approve works and payment
  const handleApproveWorksAndPayment = () => {
    console.log("Approve works and payment clicked");
  };

  // Handle approve payment
  const handleApprovePayment = () => {
    console.log("Approve payment clicked");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="py-4 px-6  flex flex-col-reverse lg:flex-row lg:justify-between gap-4">
        <h1 className=" text-xl md:text-2xl font-bold">Subcontracted Work Details</h1>
        <Sidebar />
      </header>

      <div className="mt-6">
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 space-y-4 mb-10">
          <header className="border-b pb-4">
            <h2 className="text-xl text-blue font-semibold">{selectedWork.task_title}</h2>
            <p className="text-sm mt-2">{selectedWork.task_description}</p>
            <p className="text-sm mt-2">Task Category: {selectedWork.task_category}</p>
          </header>

          <section className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Task Cost (Labor)</span>
              <span className="font-medium">Ksh. {selectedWork.task_cost_labor}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Task Cost (Overhead)</span>
              <span className="font-medium">Ksh. {selectedWork.task_cost_overhead}</span>
            </div>
          </section>
          
          <AddLaborerDetails />

          {/* Laborer details table */}
          <section className="overflow-x-auto rounded-lg shadow-md mt-3">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="blue text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                    Laborer Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                    ID Number
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                    Title
                  </th> 
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                    Daily Rate
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                    Mpesa No.
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {labourers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-600">
                      No labourers available
                    </td>
                  </tr>
                ) : (
                  labourers.map((labourer) => (
                    <tr key={labourer.labourer_id} className="hover:bg-gray-100 transition duration-200">
                      <td className="px-6 py-4 text-sm text-gray-700">{labourer.labourer_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{labourer.national_id_number}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{labourer.labourer_title}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">Ksh. {labourer.labourer_daily_rate}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{labourer.labourer_mpesa_number}</td>
                      <td className="px-6 py-4 text-sm">
                      <div className="flex gap-7">
                        <EditLaborerDetails />
                        <button className="hover:text-red-600 transition duration-200 cursor-pointer" onClick={handleRemoveLaborer}>
                          <FaTrashCan className="w-6 h-6" />
                        </button>
                      </div>
                    </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </section>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full md:w-1/2">
          <h2 className="text-xl font-semibold text-blue mb-4">Proof of Work Done</h2>
          <button
            onClick={() => setIsProofModalOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
          >
            Upload Proof of Work
          </button>
          {/* Display Uploaded Proofs */}
          <div className="mt-6 space-y-4">
            {proofOfWorks.length === 0 ? (
              <p className="text-gray-600">No proof of work uploaded yet.</p>
            ) : (
              proofOfWorks.map((proof) => (
                <div key={proof.image_id} className="border p-4 rounded-lg flex gap-4">
                  <img
                    src={`${constants.BASE_URL}${proof.image_file}`} // ✅ Correct string interpolation
                    alt="Proof of Work"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div>
                    <p className="text-gray-700">{proof.description}</p>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
        <ProofOfWorkModal workId={workId} isOpen={isProofModalOpen} onClose={() => setIsProofModalOpen(false)} />
          {/* Reviews Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
            <h2 className="text-xl font-semibold text-blue mb-4">Reviews</h2>
            <div className="flex flex-col gap-8">
              <div>
                <form>
                  <label
                    htmlFor="supervisor-review"
                    className="block text-sm font-medium text-gray-800 mb-1"
                  >
                    Contractor's Supervisor Review
                  </label>

                  <textarea
                    id="supervisor-review"
                    rows={3}
                    className="project-modal-input"
                  ></textarea>
                  <button className="w-full md:w-[200px] mt-2 blue text-white cursor-pointer py-2 px-4 rounded-lg hover:bg-blue-900 transition duration-200">
                    Submit
                  </button>
                </form>
              </div>
              <div>
                <form>
                  <label
                    htmlFor="supervisor-review"
                    className="block text-sm font-medium text-gray-800 mb-1"
                  >
                    Consultant's Supervisor Review
                  </label>

                  <textarea
                    id="supervisor-review"
                    rows={3}
                    className="project-modal-input"
                  ></textarea>
                  <button className="w-full md:w-[200px] mt-2 blue text-white cursor-pointer py-2 px-4 rounded-lg hover:bg-blue-900 transition duration-200">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Approval Buttons */}
      <div className="mt-14 flex flex-col items-center">
        <h2 className="text-xl font-semibold text-blue mb-4">
          Approval Section
        </h2>
        <div className="flex flex-col md:flex-row flex-wrap gap-4">
          <button
            className="w-full md:w-[200px] flex items-center justify-center bg-green-600 text-white cursor-pointer py-3 px-4 rounded-lg hover:bg-green-900 transition duration-200"
            onClick={handleApproveWorks}
          >
            <CircleCheck className="mr-2" /> Approve Works
          </button>
          <button
            className="w-full md:w-[300px] flex items-center justify-center bg-blue-600 text-white cursor-pointer py-3 px-4 rounded-lg hover:bg-blue-900 transition duration-200"
            onClick={handleApproveWorksAndPayment}
          >
            <BadgeCheck className="mr-2" /> Approve Works & Payment
          </button>
          <button
            className="w-full md:w-[200px] flex items-center justify-center bg-purple-600 text-white cursor-pointer py-3 px-4 rounded-lg hover:bg-purple-900 transition duration-200"
            onClick={handleApprovePayment}
          >
            <CircleDollarSign className="mr-2" /> Approve Payment
          </button>
        </div>
      </div>
    </div>
  );
}
