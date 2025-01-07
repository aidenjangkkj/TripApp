import {useState } from "react";
import "../src/index.css";
import { chat } from "./openai";
import Maps from "./components/Maps";

export default function App() {
  const [selectedStartDate, setSelectedStartDate] = useState("");
  const [selectedEndDate, setSelectedEndDate] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [travelTheme, setTravelTheme] = useState("");
  const [transportation, setTransportation] = useState("");
  const [travelCost, setTravelCost] = useState("");
  const [result, setResult] = useState("");

  const [coordinates, setCoordinates] = useState([]);
  const [place, setPlace] = useState([]);
  const [description, setDescription] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !selectedStartDate ||
      !selectedEndDate ||
      !selectedPlace ||
      !travelTheme ||
      !transportation ||
      !travelCost
    ) {
      alert("모든 항목을 채워주세요!");
      return;
    }

    const formData = `
      여행 일정: ${selectedStartDate} ~ ${selectedEndDate}
      여행 지역: ${selectedPlace}
      여행 테마: ${travelTheme}
      이동 수단: ${transportation}
      여행 경비: ${travelCost} 원
    `;

    const Prompt = `
    여행 계획을 다음 조건과, 해당 날짜의 여행지 날씨를 고려해서 아침, 점심, 저녁으로 구성해줘.
    
    JSON 형식으로 답변해줘. 예:
    [
      {
        "날짜": "YYYY-MM-DD",
        "날씨": "맑음",
        "강수확률": "10%",
        "아침": { "장소": "장소1", "음식": "음식1", "설명": "설명1", "위도": "37.123", "경도": "127.456" },
        "점심": { "장소": "장소2", "음식": "음식2", "설명": "설명2", "위도": "37.789", "경도": "127.654" },
        "저녁": { "장소": "장소3", "음식": "음식3", "설명": "설명3", "위도": "37.111", "경도": "127.222" }
      }
    ]
    ${formData}
    `;

    chat(Prompt, (response) => {
      const result = JSON.parse(response);

      const coords = result
        .map((day) => {
          return ["아침", "점심", "저녁"].map((meal) => ({
            lat: day[meal]?.위도 ? parseFloat(day[meal]?.위도) : null,
            lng: day[meal]?.경도 ? parseFloat(day[meal]?.경도) : null,
          }));
        })
        .flat();

      const place = result
        .map((day) => {
          return ["아침", "점심", "저녁"].map((meal) => ({
            place: day[meal]?.장소 || "",
          }));
        })
        .flat();

      const desc = result
        .map((day) => {
          return ["아침", "점심", "저녁"].map((meal) => ({
            description: day[meal]?.설명 || "",
          }));
        })
        .flat();

      console.log("coords", coords);
      console.log("place", place);
      console.log("desc", desc);

      setCoordinates(coords);
      setPlace(place);
      setDescription(desc);
      setResult(result);
    });
  };

  const handleEdit = (dayIndex, meal, field, newVal) => {
    setResult((prevResult) => {
      const updatedResult = [...prevResult];
      updatedResult[dayIndex][meal][field] = newVal;
      return updatedResult;
    });
  };

  const handleDelete = (index) => {
    setResult((prevResult) => prevResult.filter((_, id) => id !== index));
  };

  return (
    <div className="text-center my-4">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <p className="mb-2">여행 일정</p>
            <label>
              Start
              <input
                type="date"
                className="previus border border-gray-400 mx-3"
                onChange={(evt) => {
                  setSelectedStartDate(evt.currentTarget.value);
                }}
              ></input>
            </label>
            End
            <input
              type="date"
              className="after border border-gray-400 mx-3 "
              onChange={(evt) => {
                if (
                  selectedStartDate &&
                  evt.currentTarget.value > selectedStartDate
                ) {
                  setSelectedEndDate(evt.currentTarget.value);
                } else {
                  evt.currentTarget.value = "";
                  alert("유효한 날짜를 설정해주세요");
                }
              }}
            ></input>
          </div>

          <div>
            <p className="mt-2">여행 지역</p>
            <input
              type="text"
              value={selectedPlace}
              onChange={(evt) => setSelectedPlace(evt.target.value)}
              placeholder="지역을 입력하세요"
              className="border border-gray-400 px-2 py-1"
            />
          </div>

          <div>
            <p className="mb-2">여행 테마</p>
            <select
              className="border border-gray-400"
              onChange={(e) => setTravelTheme(e.target.value)}
            >
              <option value="">선택하세요</option>
              <option value={"식도락"}>식도락</option>
              <option value={"문화체험"}>문화체험</option>
              <option value={"자연감상"}>자연감상</option>
            </select>
          </div>

          <div>
            <p className="mb-2">이동 수단</p>
            <select
              className="border border-gray-400"
              onChange={(e) => setTransportation(e.target.value)}
            >
              <option value="">선택하세요</option>
              <option value={"자동차"}>자동차</option>
              <option value={"대중교통"}>대중교통</option>
              <option value={"자전거"}>자전거</option>
              <option value={"도보"}>도보</option>
            </select>
          </div>

          <div>
            <p className="my-2">여행 경비</p>
            <input
              type="number"
              className="border border-gray-400"
              onChange={(e) => setTravelCost(e.target.value)}
            />
          </div>
          <button type="submit" className="border border-gray-400 mt-4">
            입력 완료
          </button>
        </form>
      </div>

      <hr className="my-5"></hr>

      <div>
        <h1>여행 정보</h1>
        {Array.isArray(result) ? (
          result.map((day, index) => (
            <div key={index} className="mb-4">
              <h2>{day.날짜}</h2>
              <p>
                날씨: {day.날씨} / 강수확률: {day.강수확률}
              </p>
              <ul>
                {["아침", "점심", "저녁"].map((meal) => (
                  <li key={meal} className="mt-3">
                    <h3>{meal}</h3>
                    <ul>
                      <li>
                        <strong>장소:</strong> {day[meal]?.장소}
                      </li>
                      <li>
                        <strong>음식:</strong> {day[meal]?.음식}
                        <button
                          className="border mx-1 px-2 border-gray-400 rounded-xl"
                          onClick={() => {
                            const newFood = prompt(
                              "음식 수정",
                              day[meal]?.음식
                            );
                            if (newFood) {
                              handleEdit(index, meal, "음식", newFood);
                            }
                          }}
                        >
                          수정
                        </button>
                      </li>
                      <li>
                        <strong>설명:</strong> {day[meal]?.설명}
                        <button
                          className="border mx-1 px-2 border-gray-400 rounded-xl"
                          onClick={() => {
                            const newDes = prompt("설명 수정", day[meal]?.설명);
                            if (newDes) {
                              handleEdit(index, meal, "설명", newDes);
                            }
                          }}
                        >
                          수정
                        </button>
                      </li>
                    </ul>
                  </li>
                ))}
              </ul>
              <button
                className="border mx-1 px-2 border-gray-400 rounded-xl"
                onClick={() => handleDelete(index)}
              >
                삭제
              </button>
            </div>
          ))
        ) : (
          <p>{result}</p>
        )}
      </div>
      <hr className="my-4"></hr>
      <Maps coord={coordinates} place={place} desc={description}></Maps>
    </div>
  );
}
