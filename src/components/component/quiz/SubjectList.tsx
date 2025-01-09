import { useEffect, useState } from "react";
import { getAllSubjects } from "../../../api/SubjectAPI";
import { SubjectModel } from "../../../model/SubjectModel";
import { QuizList } from "./QuizList";

export const SubjectList = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [showQuizList, setShowQuizList] = useState(false);
  const [subjects, setSubjects] = useState<SubjectModel[]>([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const subjectsData = await getAllSubjects();
      setSubjects(subjectsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNext = () => {
    if (selectedSubject && selectedGrade) {
      setShowQuizList(true);
    } else {
      alert("Vui lòng chọn cả môn học và lớp.");
    }
  };

  return (
    <div className="container py-5">
      {!showQuizList ? (
        <>
          <h1 className="text-center mb-4 text-primary">Chọn bài kiểm tra</h1>
          <div className="row justify-content-center">
            <div className="col-md-8">
              {/* Chọn môn học */}
              <div className="card shadow-sm mb-4">
                <div className="card-header bg-primary text-white text-center">
                  <h2>Môn học</h2>
                </div>
                <div className="card-body">
                  <div className="row">
                    {subjects.map((subject) => (
                      <div
                        key={subject.subjectId}
                        className="col-6 col-sm-4 mb-3"
                      >
                        <button
                          className={`btn w-100 ${
                            selectedSubject === subject.name
                              ? "btn-primary text-white"
                              : "btn-outline-primary"
                          }`}
                          onClick={() => setSelectedSubject(subject.name)}
                        >
                          {subject.name}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chọn lớp */}
              <div className="card shadow-sm">
                <div className="card-header bg-success text-white text-center">
                  <h2>Chọn lớp</h2>
                </div>
                <div className="card-body">
                  <div className="row">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
                      <div key={grade} className="col-4 col-sm-3 mb-3">
                        <button
                          className={`btn w-100 ${
                            selectedGrade === grade
                              ? "btn-success text-white"
                              : "btn-outline-success"
                          }`}
                          onClick={() => setSelectedGrade(grade)}
                        >
                          Lớp {grade}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nút Tiếp theo */}
              <div className="text-center mt-4">
                <button className="btn btn-lg btn-primary" onClick={handleNext}>
                  Tiếp theo
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <QuizList
          selectedGrade={selectedGrade}
          selectedSubject={selectedSubject}
          setShowQuizList={setShowQuizList}
        />
      )}
    </div>
  );
};
