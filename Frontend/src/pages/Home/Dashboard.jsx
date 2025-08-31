import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuCirclePlus } from 'react-icons/lu';
import moment from 'moment'
import DashboardLayout from "../../Components/Layouts/DashboardLayout"
import Modal from '../../Components/Modal';
import CreateResumeForm from "../../pages/Home/CreateResumeForm"

const Dashboard = () => {

  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState(null);

  const fetchAllResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setAllResumes (response.data);
    } catch (error) {
      console.error("Error fetching resumes:", error);
    }
  };


  useEffect(() => {
    fetchAllResumes();
  }, []);

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
        <div
          className="h-[300px] flex flex-col gap-5 items-center justify-center bg-white rounded-lg border-purple-100 hover:border-purple-300 hover:bg-purple-50/5 cursor-pointer"
          onClick={() => setOpenCreateModal(true)}>

            <div className="w-12 h-12 flex items-center justify-center bg-purple-200/60 rounded-2xl">
              <LuCirclePlus className="text-xl text-purple-500"/>
            </div>

            <h3 className="font-medium text-gray-800">Add New Resume</h3>
          </div>

          {allResumes?.map((resume) => (
            <ResumeSummaryCard
              key={resume?._id}
              imgUrl={resume?.thumbnailLink || null}
              title={resume.title}
              lastUpdated={
                resume?.updatedAt
                ? moment(resume.updatedAt).format("DD MM YYYY") : ""
              }
              onSelect={()=>navigate(`/resume/${resume?._id}`)}/>
          ))}
      </div>

      <Modal 
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
        hideHeader>
          <div className="">
            <CreateResumeForm/>
          </div>
        </Modal>
    </DashboardLayout>
  )
};

export default Dashboard