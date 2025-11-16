let index = 0;
let score = 0;
let timer;
let timeLeft = 600; // 10 phút

const questions = [
  {
    question: "1. Luật Cán bộ, Công chức chính thức có hiệu lực từ năm nào?",
    answers: ["2008", "2010", "2012", "2014"],
    correct: 1
  },
  {
    question: "2. Công chức làm việc theo chế độ nào?",
    answers: ["Hợp đồng", "Bổ nhiệm", "Khoán sản phẩm", "Luân chuyển bắt buộc"],
    correct: 1
  },
  {
    question: "3. Công chức phải tuân thủ nguyên tắc nào?",
    answers: ["Tập trung dân chủ", "Tự do tuyệt đối", "Linh hoạt theo ý kiến cá nhân", "Không bị giám sát"],
    correct: 0
  },
  {
    question: "4. Cơ quan nào là cơ quan quản lý Nhà nước về công chức?",
    answers: ["Bộ Nội vụ", "Bộ Tài chính", "UBND xã", "Thanh tra Chính phủ"],
    correct: 0
  },
  {
    question: "5. Công chức có nghĩa vụ nào sau đây?",
    answers: ["Chấp hành kỷ luật", "Tự ý bỏ việc", "Không chịu trách nhiệm", "Làm việc tuỳ thích"],
    correct: 0
  },
  {
    question: "6. Công chức được đánh giá theo tiêu chí nào?",
    answers: ["Kết quả thực hiện nhiệm vụ", "Thâm niên", "Chiều cao – cân nặng", "Mối quan hệ cá nhân"],
    correct: 0
  },
  {
    question: "7. Trong tuyển dụng công chức, hình thức nào được áp dụng?",
    answers: ["Thi tuyển", "Xét tuyển", "Cả 2", "Không có hình thức tuyển dụng"],
    correct: 2
  },
  {
    question: "8. Công chức bị kỷ luật khi nào?",
    answers: ["Vi phạm nghĩa vụ", "Đi làm đầy đủ", "Hoàn thành xuất sắc", "Không vi phạm gì"],
    correct: 0
  },
  {
    question: "9. Cơ quan nào có thẩm quyền bổ nhiệm công chức?",
    answers: ["Cơ quan quản lý công chức", "Trường học", "Doanh nghiệp", "Cá nhân"],
    correct: 0
  },
  {
    question: "10. Công chức phải tuân thủ đạo đức nào?",
    answers: [
      "Trung thành với Tổ quốc",
      "Không cần trách nhiệm",
      "Thiên vị trong công việc",
      "Lợi dụng chức vụ"
    ],
    correct: 0
  }
];

// Random thứ tự câu hỏi
shuffleArray(questions);

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;

    document.getElementById("timer").innerHTML =
      `Thời gian: ${min}:${sec < 10 ? "0" + sec : sec}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      finishQuiz();
    }
  }, 1000);
}

function loadQuestion() {
  let q = questions[index];

  document.getElementById("quiz").innerHTML = `
    <div class="question">${q.question}</div>
  `;

  let answersHTML = "";

  // Random thứ tự đáp án
  let answerIndices = [0, 1, 2, 3];
  shuffleArray(answerIndices);

  answerIndices.forEach(i => {
    answersHTML += `
      <div class="answer">
        <label>
          <input type="radio" name="ans" value="${i}"> ${q.answers[i]}
        </label>
      </div>
    `;
  });

  document.getElementById("quiz").innerHTML += answersHTML;
}

function nextQuestion() {
  let ans = document.querySelector("input[name='ans']:checked");
  if (!ans) return alert("Bạn phải chọn một đáp án!");

  if (parseInt(ans.value) === questions[index].correct) score++;

  index++;

  if (index >= questions.length) {
    finishQuiz();
    return;
  }

  loadQuestion();
}

function finishQuiz() {
  clearInterval(timer);
  document.getElementById("quiz").innerHTML = "";
  document.getElementById("nextBtn").style.display = "none";

  let answerList = questions.map(q =>
    `${q.question}<br><b>Đáp án đúng:</b> ${q.answers[q.correct]}<br><br>`
  ).join("");

  document.getElementById("result").innerHTML = `
    <p>Bạn đạt: <b>${score}/${questions.length}</b></p>
    <hr>
    <h3>Đáp án:</h3>
    <div>${answerList}</div>
  `;
}

startTimer();
loadQuestion();
