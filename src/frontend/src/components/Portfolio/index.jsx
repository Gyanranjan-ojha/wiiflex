// Portfolio.tsx
import { useState } from "react";
import { Button, Img, Heading } from "..";
import { usePortfolio } from "../../context/PortfolioProvider";
import PortfolioForm from "../PortfolioForm";
import { baseUrl, YOUR_API_KEY } from "../../lib/utils";
import axios from "axios";
import { useUserDetails } from "../../context/UserContextProvider";
import { useParams } from "react-router-dom";

const Portfolio = ({ portfolios = "Portfolios", candidateData, ...props }) => {
  const { clearPortfolio } = usePortfolio();
  const [isPortfolioFormOpen, setIsPortfolioFormOpen] = useState(false);
  const { fetchCandidateData } = useUserDetails();

  const params = useParams();
  let candidateId = params?.id;

  // Get candidateId from localStorage if it's undefined or null
  if (!candidateId) {
    candidateId = localStorage.getItem("candidateId");
  }

  const handleAddPortfolioClick = () => {
    setIsPortfolioFormOpen(true);
  };

  const deleteEducationHandler = async (portfolioUrl) => {
    const adminEmail = localStorage.getItem("email") || "barkaleamol@gmail.com";

    let body = {
      candidate_portfolio: portfolioUrl,
      candidate_id: candidateId,
      email: adminEmail,
    };
    console.log("deleteEducationHandler body:", body);

    try {
      const response = await axios.delete(
        `${baseUrl}/candidates/delete_candidate/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: body,
        }
      );
      console.log("response.status:", response.status);
      if (response.status === 200 || response.status === 201) {
        fetchCandidateData(candidateId);
        // reset();
      } else {
        console.error("Registration failed with status:", response.status);
      }
    } catch (err) {
      alert(err.response?.data?.error);
    } finally {
      // setLoading(false);
    }
  };

  return (
    <div
      {...props}
      className={`${props.className} flex flex-col my-6 ml-2 gap-4 p-6 md:ml-0 sm:p-5 border-neutrals-20 border-2 border-solid bg-color-white`}
    >
      <div className="flex items-center justify-between self-stretch">
        <Heading
          size="display_2"
          as="h2"
          className="!text-neutrals-100 font-semibold text-[20px]"
        >
          {portfolios}
        </Heading>
        <div className="flex flex-1 justify-end gap-2">
          <Button
            shape="square"
            color="undefined_undefined"
            className="w-[40px] !p-0"
            onClick={handleAddPortfolioClick}
          >
            <div className="border-2 p-1 rounded">
              <Img src="/images/img_icon_brands_primary.svg" />
            </div>
          </Button>
        </div>
      </div>
      {isPortfolioFormOpen && (
        <PortfolioForm
          onClose={() => setIsPortfolioFormOpen(false)}
          mode="edit"
          portfolioLink={candidateData.portfolio}
        />
      )}
      {candidateData.portfolio && (
        <div className="flex items-end mt-4">
          <a
            href={candidateData.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {candidateData.portfolio}
            <Img
              src={`https://api.thumbnail.ws/api/${YOUR_API_KEY}/thumbnail/get?url=${candidateData.portfolio}&width=640`}
              alt={`Thumbnail of ${candidateData.portfolio}`}
              className="w-[200px] h-[150px] object-cover"
            />
          </a>

          <Button
            shape="square"
            color="undefined_undefined"
            className="rounded-md !p-1 text-color-white bg-light_blue-700 text-white"
            onClick={() => deleteEducationHandler(candidateData.portfolio)}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
