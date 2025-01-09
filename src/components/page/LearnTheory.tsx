import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Lesson {
    section: string;
    lessons: { title: string; link: string }[];
}

const lessonsData: Lesson[] = [
    {
        section: '1. Giới thiệu Java',
        lessons: [
            { title: '1.1. Giới thiệu ngôn ngữ lập trình Java', link: '#' },
            { title: '1.2. Tại sao nên học Java?', link: '#' },
            { title: '1.3. Cơ hội nghề nghiệp với Java', link: '#' },
            { title: '1.4. Thiết lập môi trường và cài đặt IDE', link: '#' },
        ],
    },
    {
        section: '2. Nhập môn Java',
        lessons: [
            { title: '2.1. Bộ ký tự trong Java', link: '#' },
            { title: '2.2. Từ khóa của Java', link: '#' },
            { title: '2.3. Định danh và quy tắc định danh trong Java', link: '#' },
            { title: '2.4. Lệnh và khối lệnh trong Java', link: '#' },
            { title: '2.5. Cấu trúc một chương trình Java', link: '#' },
            { title: '2.6. Package trong Java', link: '#' },
            { title: '2.7. Chương trình Java đầu tiên', link: '#' },
            { title: '2.8. Nhập xuất màn hình console trong Java', link: '#' },
            { title: '2.9. Comment trong Java', link: '#' },
            { title: '2.10. Các kiểu dữ liệu trong Java', link: '#' },
            { title: '2.11. Biến và phạm vi biến trong Java', link: '#' },
            { title: '2.12. Hàm - Phương thức trong Java', link: '#' },
            { title: '2.13. Các toán tử trong Java', link: '#' },
        ],
    },
    {
        section: '3. Lập trình hướng đối tượng',
        lessons: [
            { title: '3.1. Lập trình hướng đối tượng (OOP) là gì?', link: '#' },
            { title: '3.2. Tính đóng gói trong lập trình hướng đối tượng (OOP)', link: '#' },
            { title: '3.3. Tính kế thừa trong lập trình hướng đối tượng (OOP)', link: '#' },
            { title: '3.4. Tính đa hình trong lập trình hướng đối tượng (OOP)', link: '#' },
            { title: '3.5. Tính trừu tượng trong lập trình hướng đối tượng (OOP)', link: '#' },
        ],
    },
];

const LessonList: React.FC = () => {
    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Khóa học Java từ cơ bản đến nâng cao</h1>
            {lessonsData.map((section, index) => (
                <div key={index} className="mb-4">
                    <h2 className="h5 mb-3">{section.section}</h2>
                    <ul className="list-group">
                        {section.lessons.map((lesson, idx) => (
                            <li key={idx} className="list-group-item">
                                <a href={'/lesson'} className="text-decoration-none">
                                    {lesson.title}
                                </a>

                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default LessonList;
