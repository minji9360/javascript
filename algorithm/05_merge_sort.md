## 병합 정렬의 핵심
대표적인 분할 정복 알고리즘 중 하나로, 정확히 반으로 나눈 후 나중에 합치면서 정렬한다.

## 예시
7 6 5 8 3 9 1  
위 숫자들을 오름차순으로 정렬하라

## 진행
1. 배열을 모두 하나씩 쪼갠다.
> 7 | 6 | 5 | 8 | 3 | 5 | 9 | 1
2. 두 개씩 짝을 지어 비교 정렬한다.  
(처리하는 데이터의 수 2^1)
> 6 7 | 5 8 | 3 5 | 1 9
3. 두 개씩은 이미 정렬이 완료되어 있는 상태로, 또 두 개씩 짝을 지어 비교 정렬한다.  
(처리하는 데이터의 수 2^2)
> 5 6 7 8 | 1 3 5 9
4. 또 두 개 짝을 지어 비교 정렬  
(처리하는 데이터의 수 2^3)
> 1 3 5 5 6 7 8 9

## 진행
```c
#include <stdio.h>

int number = 8;
int sorted[8]; // 정렬을 위해 사용할 추가적인 정렬 배열은 반드시 전역 변수로 선언 (중요)
// 필요할 때마다 변수를 생성하면 비효율적으로 메모리를 사용하게 되므로

void merge(int a[], int m, int middle, int n)
{
	int i, j k;

	i = m;
	j = middle + 1;
	k = m;
	// 작은 순서로 배열에 삽입
	while(i <= middle && j <= n)
	{
		if(a[i] <= a[j])
		{
			sorted[k] = a[i];
			i++;
		}
		else
		{
			sorted[k] = a[j];
			j++;
		}
		k++;
	}
	// 남은 데이터도 삽입
	if(i > middle)
		for(int t = j; t <= n; t++)
		{
			sorted[k] = a[t];
			k++;
		}
	else
		for(int t = i; t <= middle; t++)
		{
			sorted[k] = a[t];
			k++;
		}
	// 정렬된 배열을 삽입
	for(int t = m; t <= n; t++)
		a[t] = sorted[t];
}

void mergeSort(int a[], int m, int n)
{
	// 크기가 1보다 큰 경우
	if(m < n)
	{
		int middle = (m + n) / 2;
		mergeSort(a, m, middle);
		mergeSort(a, middle + 1, n);
		merge(a, m, middle, n);
	}
}

int main(void)
{
	int array[number] = {7, 86, 5, 8, 3, 5, 9, 1};
	mergeSort(array, 0, number - 1);
	for(int i = 0; i < number; i++)
		printf("%d ", array[i]);
	return (0);
}
```

## 시간 복잡도 : O(N * logN)
진행에서 배열을 모두 하나씩 쪼갠 후에, 비교 정렬 단계를 보면 3단계까지 진행된다. 총 8개인 배열에서 log 계산을 하면 3이 나온다(log₂8 = 3).  
너비는 N(비교할 숫자의 개수), 높이는 logN(비교 수행 단계의 수)로, N * logN이 된다.  
작은 단계만 수행하더라도 전체 데이터를 모두 검사 가능하다.  

단점은, 기존의 데이터를 담을 추가적인 배열 공간이 필요하다는 점에서 메모리 활용이 비효율적이라는 것이다. 그래도 시간 복잡도가 N * logN으로 고정된다는 점이 장점인 빠르고 효율적인 알고리즘이다.
