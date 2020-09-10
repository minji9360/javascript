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

### 데이터를 묶어서 정렬
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
