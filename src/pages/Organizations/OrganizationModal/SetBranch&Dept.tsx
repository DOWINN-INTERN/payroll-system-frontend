import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
// import { toast } from "sonner";
import { useAxiosRefreshRequest } from "../../../auth/useAxiosRefreshRequest";
import { useEffect } from "react";
import { useAuth } from "../../../auth/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface IBranchProps {
  isOpen: boolean;
  closeModal: void;
  orgAlias: string;
  userEmail: string;
}

interface IBranch {
  branch_alias: string;
  id: string;
  name: string;
}

export const SetBranchDept = (props: IBranchProps) => {
  const [assignBranch, setIsAssignbranch] = useState("");
  const { branches, setBranch } = useAuth();

  const [departments, setDepartments] = useState();

  const [departmentAlias, setDeparmtentAlias] = useState("");

  const [isopenDepartmentOption, setIsOpenDepartmentOption] = useState(false);
  const axiosRequest = useAxiosRefreshRequest();

  const queryClient = useQueryClient();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getBranches = async () => {
      try {
        const response = await axiosRequest.get(
          `/organizations/${props.orgAlias}/branches`,
          {
            signal: controller.signal,
          }
        );
        console.log(response.data);

        isMounted && setBranch(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getBranches();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const getDepartments = async (assignBranch) => {
    try {
      const response = await axiosRequest.get(
        `/organizations/${props.orgAlias}/branches/${assignBranch}/departments`
      );
      console.log(response.data);

      isMounted && setDepartments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const mutationSetBranch = useMutation({
    mutationFn: async (credential): Promise<IBranch> => {
      const response = await axiosRequest.post(
        `/organizations/${props.orgAlias}/members/branch`,
        credential
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Members"],
      });
      // toast.success("Successfully set");
    },
    // onError: () => {
    //   toast.error("Failed to set");
    // },
  });
  const mutationSetDepartment = useMutation({
    mutationFn: async (credential) => {
      const response = await axiosRequest.post(
        `/organizations/${props.orgAlias}/members/department`,
        credential
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["Members"],
      });
      toast.success("Successfully set");
    },
    onError: () => {
      toast.error("Failed to set");
    },
  });

  const handleChangeBranch = (e) => {
    getDepartments(e.target.value);
    setIsAssignbranch(e.target.value);
    console.log(assignBranch);
    setIsOpenDepartmentOption(true);
  };

  const handleChangeDepartment = (e) => {
    setDeparmtentAlias(e.target.value);
  };

  const seTMembersBranch = () => {
    console.log(props.userEmail, assignBranch);
    console.log(props.userEmail, assignBranch, departmentAlias);
    Promise.all([
      mutationSetBranch.mutate({
        email: props.userEmail,
        branch: assignBranch,
      }),
      mutationSetDepartment.mutate({
        email: props.userEmail,
        branch: assignBranch,
        department: departmentAlias,
      }),
    ])
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    props.closeModal();
    setIsOpenDepartmentOption(false);
  };

  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={props.closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Create Branch
                  </Dialog.Title>
                  <div className="mt-2  flex flex-col gap-10">
                    <select
                      className=" px-4 py-2 w-full border rounded bg-red-100"
                      name="branches"
                      id=""
                      onChange={handleChangeBranch}
                    >
                      <option value="df">Select a branch</option>

                      {branches &&
                        branches.map((branch) => (
                          <option
                            className=" w-full"
                            value={branch.branch_alias}
                            key={branch.id}
                          >
                            {branch.name}
                          </option>
                        ))}
                    </select>

                    {isopenDepartmentOption ? (
                      <select
                        className=" px-4 py-2 w-full border rounded bg-red-100"
                        name="branches"
                        id=""
                        onChange={handleChangeDepartment}
                      >
                        <option value="df">Select a department</option>
                        {departments &&
                          departments.map((departments) => (
                            <option
                              className=" w-full"
                              value={departments.alias}
                              key={departments.id}
                            >
                              {departments.name}
                            </option>
                          ))}
                      </select>
                    ) : (
                      <p className="text-center">Select a Branch First</p>
                    )}
                  </div>

                  <div className="mt-4  flex justify-end gap-4">
                    <button
                      type="button"
                      className="inline-flex  rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={props.closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex  rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={seTMembersBranch}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
