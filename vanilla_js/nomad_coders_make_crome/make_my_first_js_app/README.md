
![이름 입력 전](https://user-images.githubusercontent.com/56961349/89635045-54ca3280-d8e1-11ea-9684-1b5860199866.png)
![이름, 할 일 입력](https://user-images.githubusercontent.com/56961349/89635318-c6a27c00-d8e1-11ea-8f7d-86d53d6a39d3.png)
## To Do List

* 기 간 : 3일 (2020/08/05 ~ 2020/08/07)
* 소 개 : 노마드 코더의 강의를 수강한 후(20/08/03 ~ 20/08/06), 실습한 내용에 기능과 CSS를 추가 및 수정

## 제작기간

* 1일차 : html, 시계 기능, 이름 입력 및 출력 기능, to do list 입력 및 저장 기능
* 2일차 : to do list 삭제 기능, 배경 이미지 랜덤 변경 기능, 날씨 API 사용
* 3일차 : 이미지 추가 및 CSS 변경, 닉네임 입력 여부에 따라 to do list 출력되도록 수정

## 사용기술

* Front-End : Javascript, HTML5, CSS3
* Open API : openWeatherMap
* Tool : Visual Studio Code, Git

## 내용

* 현재 시각 출력
* 입력받은 이름이 없으면 입력 form을 출력
* 입력받은 이름이 있으면 message와 이름, to do form, to do list를 출력
* to do list 입력받으면 삭제 버튼과 함께 출력
* 삭제 버튼 누르면 해당 to do list 삭제
* 배경 이미지 5개 중 랜덤으로 출력
* user의 location 정보와 날씨 API를 이용해 해당 지역과 기온을 출력

## 코드 설명
* clock.js ([vanilla_js/nomad_coders_make_crome/make_my_first_js_app/clock.js](https://github.com/minji9360/javascript/blob/master/vanilla_js/nomad_coders_make_crome/make_my_first_js_app/clock.js))<br/>
```javascript
const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();
```
현재 시각을 구하는 getTime() 함수 생성, 1초마다 실행<br/>
(숫자가 10보다 작으면 앞에 0을 붙여 출력하도록)<br/>

* gretting.js ([vanilla_js/namoad_coders_make_crome/make_my_first_js_app/gretting.js](https://github.com/minji9360/javascript/blob/master/vanilla_js/nomad_coders_make_crome/make_my_first_js_app/gretting.js))<br/>
```javascript
const nameForm = document.querySelector(".js-nameForm");
const input = nameForm.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    nameForm.classList.add(SHOWING_CN);
    nameForm.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    nameForm.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `${text}'s to do list`;
    toDoForm.classList.add(SHOWING_CN);
    toDoList.classList.add(SHOWING_CN);
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}
function init() {
    loadName();
}

init();
```
local storage에 이름이 없으면 이름 입력 form만 출력하여 입력받음<br/>
local storage에 이름이 있으면 이름과 message, to do form, to do list를 출력<br/>

* todo.js ([vanilla_js/nomad_coders_make_crome/make_my_first_js_app/todo.js](https://github.com/minji9360/javascript/blob/master/vanilla_js/nomad_coders_make_crome/make_my_first_js_app/todo.js))<br/>
```javascript
const nameForm = document.querySelector(".js-nameForm");
const input = nameForm.querySelector("input");
const greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    nameForm.classList.add(SHOWING_CN);
    nameForm.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    nameForm.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `${text}'s to do list`;
    toDoForm.classList.add(SHOWING_CN);
    toDoList.classList.add(SHOWING_CN);
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}
function init() {
    loadName();
}

init();
```
to do list 입력받으면 해당 내용과 삭제 버튼을 생성한 li 태그에 넣은 후 출력<br/>
입력된 to do list를 string 타입으로 바꿔준 후 local storage에 저장<br/>
저장된 to do list를 object로 바꿔 가져온 후 출력<br/>
삭제 버튼을 누르면 HTML과 local storage에서 해당 to do list 삭제<br/>

* bg.js ([vanilla_js/nomad_coders_make_crome/make_my_first_js_app/bg.js](https://github.com/minji9360/javascript/blob/master/vanilla_js/nomad_coders_make_crome/make_my_first_js_app/bg.js))<br/>
```javascript
const body = document.querySelector("body");
const IMG_NUMBER = 5;

function paintImage(imgNumber){
    const image = new Image();
    image.src = `/images/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function genRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return (number);
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

init();
```
Math 함수 이용하여 생성한 임의의 수를 이용해 랜덤 이미지 파일 출력</br>

* weather.js ([vanilla_js/nomad_coders_make_crome/make_my_first_js_app/weather.js](https://github.com/minji9360/javascript/blob/master/vanilla_js/nomad_coders_make_crome/make_my_first_js_app/weather.js))<br/>
```javascript
const weather = document.querySelector(".js-weather");

const API_KEY = "4a10f67fc9fd884cc994815bc506686f";
const COORDS = "coords";

function getWeather(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
    .then(function(response){ 
        return (response.json());
    })
    .then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Cant access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();
```
user의 location 좌표 정보를 읽어서 위도, 경도 정보를 가져옴<br/>
가져온 좌표 정보를 API 주소에 넣고 정보를 가져옴
