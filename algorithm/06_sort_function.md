## C++ STL sort() 함수
직접 정렬 알고리즘을 구현해서 프로그래밍 대회나 실무에서 사용할 수 있지만, 정렬 관련 훌륭한 라이브러리가 있으므로 가져다 쓰면 된다.  
내부 정렬 원리를 모른 채 가져다 쓰는 것은 옳지 못하므로 기존 정렬에 대해 공부를 잘 하고 사용하도록 하자.  

## 사용법
### 기본
```c++
#include <iostream>
#include <algorithm>

using namespace std;

int main(void)
{
	int a[10] = {9, 3, 5, 4, 1, 10, 8, 6, 7, 2};
	sort(a, a + 10);
	for(int i = 0; i < 10; i++)
		count << a[i] << ' ';
}
```

### 정렬할 기준을 직접 정의
```c++
#include <iostream>
#include <algorithm>

using namespace std;

bool compare(int a, int b)
	return a > b;

int main(void)
{
	int a[10] = {9, 3, 5, 4, 1, 10, 8, 6, 7, 2};
	sort(a, a + 10, compare);
	for(int i = 0; i < 10; i++)
		cout << a[i] << ' ';
	return (0);
}
```

### 데이터를 묶어서 정렬 (클래스)
위와 같은 단순 데이터 정렬 기법은 대회에서 나오는 것으로, 실무에서는 데이터들이 객체로 정리되어 있다. (객체지향기법 이용하므로)  
그렇기 때문에 특정한 변수를 기준으로 정렬하는 것이 중요하다.  
아래 코드는 학생 관리 시스템이라고 가정하고 작성되었다.  

```c++
#include <iostream>
#include <algorithm>

using namespace std;

class Student // 학생 객체 정의  // 객체 : 여러 개의 변수를 하나로 묶어 새로운 자료형처럼 만들어줌
{
	public:
		string name;
		int score;
		Student(string name, int score) // 생성자 정의  // 생성자 : 특정 객체를 초기화하기 위해 사용
		{
			// 학생의 이름과 점수를 입력받는 초기화 함수 작성
			this->name = name;
			this->score = score;
		}
		// 정렬 기준은 '점수가 작은 순서'
		bool operator <(Student &student)
			return this->score < student.score;
};

bool compare(int a, int b)
	return a > b;

int main(void)
{
	Student students[] = {
		Student("나동빈", 90),
		Student("이상욱", 93),
		Student("박한울", 97),
		Student("강종구", 87),
		Student("이태일", 92)
	};
	sort(students, students + 5);
	for(int i = 0; i < 5; i++)
		cout << students[i].name << ' ';
	return (0);
}
```

### 데이터를 묶어서 정렬 (벡터(vector)와 페어(Pair) 라이브러리 사용)
여러 개의 변수가 존재하는 상황에서 특정 변수를 기준으로 정렬하기 위해 객체(클래스)를 정의하는 방식은 실무에 적합한 방식이지, 빠른 개발을 요구하는 프로그래밍 대회와 같은 상황에는 적합하지 않다.  
빠른 개발과 숏코딩이 필요한 상황에서 사용하는 벡터, 페어 라이브러리를 사용해보자.  

벡터(Vector) STL : 배열처럼 작동하는데, 원소를 선택적으로 삽입(Push) 및 삭제(Pop) 할 수 있다. 배열을 사용하기 쉽도록 개편한 자료구조.  
페어(Pair) STL : 한 쌍의 데이터를 처리할 수 있도록 해주는 자료구조.  

#### 변수가 2개일 때 한 개의 변수를 기준으로 정렬
```c
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main(void)
{
	vector<pair<int, string> > v;
	v.push_back(pair<int, string>(90, "박한울"));
	v.push_back(pair<int, string>(85, "이태일"));
	v.push_back(pair<int, string>(82, "나동빈"));
	v.push_back(pair<int, string>(98, "강종구"));
	v.push_back(pair<int, string>(79, "이상욱"));

	sort(v.begin(), v.end());
	for(int i = 0; i < v.size(); i++)
		cout << v[i].second << ' ';
	return (0);
}
```

#### 변수가 3개일 때 두 개의 변수를 기준으로 정렬
학생을 나타낼 수 있는 정보가 이름, 성적, 생년월일이 있고 학생을 성적 순서대로 나열한다. 다만 성적이 동일한 경우 나이가 더 어린 학생이 우선순위가 높다.   
정렬 기준이 두 개 이하인 경우, 벡터와 페어를 함께 사용해 빠르게 프로그래밍 할 수 있다.
```c
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

bool compare(pair<string, pair<int, int> > a,
		pair<string, pair<int, int> > b) {
	if(a.second.first == b.second.first)
		return a.second.second > b.second.second;
	else
		return a.second.first > b.second.first;
}

int main(void)
{
	vector<pair<string, pair<int, int> > > v;
	v.push_back(pair<string, pair<int, int> >("나동빈", pair<int, int>(90, 19961222)));
	v.push_back(pair<string, pair<int, int> >("이태일", pair<int, int>(97, 19930518)));
	v.push_back(pair<string, pair<int, int> >("박한울", pair<int, int>(95, 19930203)));
	v.push_back(pair<string, pair<int, int> >("이상욱", pair<int, int>(90, 19921207)));
	v.push_back(pair<string, pair<int, int> >("강종구", pair<int, int>(88, 19900302)));

	sort(v.begin(), v.end(), compare);
	for(int i = 0; i < v.size(); i++)
		cout << v[i].first << ' ';
	return (0);
}
```

