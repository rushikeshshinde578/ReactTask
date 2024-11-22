import { useState } from "react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("Beginner");
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    categories: {
      allCourses: true, // Default to true
      ai: false,
      machineLearning: false,
      design: false,
      dataScience: false,
    },
  });

  const courses = [
    { id: 1, name: "AI Fundamentals", image: "https://tse1.mm.bing.net/th?id=OIP.Jv-POSQbOoqQgX8E-G0iFAHaEd&pid=Api&P=0&h=180", category: "AI", difficulty: "Beginner" },
    { id: 2, name: "Intro to Machine Learning", image: "https://assets.opexlearning.com/wp-content/uploads/2019/02/online-course-scaled.jpg?x58078", category: "Machine Learning", difficulty: "Beginner" },
    { id: 3, name: "Advanced AI Techniques", image: "https://elearningindustry.com/wp-content/uploads/2014/12/The-10-Most-Popular-Free-Online-Courses-For-eLearning-Professionals.jpg", category: "AI", difficulty: "Professional" },
    { id: 4, name: "Creative Design Basics", image: "https://traininglot.com/wp-content/uploads/2015/01/courses.png", category: "Design", difficulty: "Professional" },
    { id: 5, name: "Web Design Mastery", image: "https://i.ibb.co/r47zkNp/list-of-courses.png", category: "Design", difficulty: "Beginner" },
    { id: 6, name: "Data Science Essentials", image: "https://instructor-academy.onlinecoursehost.com/content/images/size/w1000/2023/05/How-to-Create-an-Online-Course-For-Free--Complete-Guide--6.jpg", category: "Data Science", difficulty: "Beginner" },
    { id: 7, name: "Professional AI Development", image: "https://leverageedublog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2020/04/01170800/Free-Online-Courses-with-Certificates.jpg", category: "AI", difficulty: "Professional" },
    { id: 8, name: "UX/UI Design Principles", image: "https://spinachindia.com/wp-content/uploads/2021/05/corporate-training.jpg", category: "Design", difficulty: "Beginner" },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilters((prevFilters) => ({
      categories: {
        ...prevFilters.categories,
        [name]: checked,
      },
    }));
  };

  const filteredCourses = courses
    .filter((course) => course.difficulty === activeTab)
    .filter((course) => course.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((course) => {
      const { allCourses, ai, machineLearning, design, dataScience } = filters.categories;
      if (allCourses) return true;
      if (ai && course.category === "AI") return true;
      if (machineLearning && course.category === "Machine Learning") return true;
      if (design && course.category === "Design") return true;
      if (dataScience && course.category === "Data Science") return true;
      return false;
    });

  return (
    <div className="programs-page">
      <main className="main">
        <h1 className="title">Explore Our Courses</h1>

        <div className="content">
          <aside className="filter-section">
            <input
              type="text"
              placeholder="Search for 1000+ Courses"
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
            <h3>Filters</h3>
            <div className="checkbox-filters">
              <div>
                <input
                  type="checkbox"
                  name="allCourses"
                  checked={filters.categories.allCourses}
                  onChange={handleFilterChange}
                />
                <label>All Courses</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="ai"
                  checked={filters.categories.ai}
                  onChange={handleFilterChange}
                />
                <label>AI</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="machineLearning"
                  checked={filters.categories.machineLearning}
                  onChange={handleFilterChange}
                />
                <label>Machine Learning</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="design"
                  checked={filters.categories.design}
                  onChange={handleFilterChange}
                />
                <label>Design</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="dataScience"
                  checked={filters.categories.dataScience}
                  onChange={handleFilterChange}
                />
                <label>Data Science</label>
              </div>
            </div>
          </aside>

          <section className="courses-section">
            <div className="tabs">
              <button
                className={`tab-btn ${activeTab === "Beginner" ? "active" : ""}`}
                onClick={() => handleTabChange("Beginner")}
              >
                Beginner
              </button>
              <button
                className={`tab-btn ${activeTab === "Professional" ? "active" : ""}`}
                onClick={() => handleTabChange("Professional")}
              >
                Professional
              </button>
            </div>

            <div className="courses-grid">
              {filteredCourses.map((course) => (
                <div className="course-card" key={course.id}>
                  <img src={course.image} alt={course.name} />
                  <p>{course.name}</p>
                  <button className="buy-btn">Buy Now</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
