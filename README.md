> ### 코드스쿼드에서 진행하는 Array Parser Repasitory 입니다.



1. ### Array 데이터 분석

   - #### 설계

   ![](https://imgur.com/UIoBy3m.png)

   - #### 함수

     1. **function arrayParser(str)**

        입력 값 : 문자열 (String)

        반환 값 : 정해지진 않았지만, `JSON.stringify` 형태에 맞게끔 출력

        ```javascript
        { type: 'array',
          child: 
           [ { type: 'number', value: '123', child: [] },
             { type: 'number', value: '22', child: [] },
             { type: 'number', value: '33', child: [] } 
            ] 
        }
        ```

        일단은, 전체적으로 생각하기 보다는 (type 에 대한 고려부터 시작하고 있었음, 그러나 4번에 있어서 일단 arrayParser 에 맞게 배열만 생각) form 에 대한 생각부터 수정

   ​

   - ### 구현하면서 느낀 점

     - Javascript 를 구현하면서도 type 에 대한점을 항상 신경쓸 것

       - 배열에 String 넣는 실수를 하면서 느낌 (계속 다른 반환값이 뜨면서도 몰랐음 하하)

     - 정규식이 와닿지 않는다 (하.. 개인적으로 싫은것일까? 별로 쓰고싶지 않다, crong한테 물어봐야겠다)

       - 그래서 숫자를 판별할 때, `parseInt` 메서드를 사용해 `NaN` 이 나오는것으로 판별하였다

       ```javascript
       console.log(parseInt("123")); // 123
       console.log(parseInt("!23")); // NaN
       console.log(parseInt(" 23")); // 23
       ```

     - `foreach` 는 `continue` 가 적용되지 않음



2. ### 2중 중첩배열 분석

   이때는 뭔가 if문으로 도배된 코드를 작성하고 있다고 느꼈다.

   디버깅을 진행하면서 조건문 납땜하는 느낌

   처음 설계했던 부분과는 생각하는 깊이정도가 말이 안된다.

   설계하면서 2의 깊이를 들어갔다면, 디버깅은 6~7정도의 깊이를 들어가는듯

   경험부족인가?



3. ### 무한으로 중첩된 배열구조 분석

   ![](https://i.imgur.com/HC2BoW6.png)

   흠 설계자료라고 하기는 좀 그렇지만, 이렇게 무엇인가를(?) 그려가면서 생각하는것이 가장 편하다.

   30분동안 잡고있었더니 두통이 올정도로 머리가 지끈지끈하다.

   해당 부분은 재귀를 통해서 구현하였으나 @crong 이 어떻게 평가해줄지 모르겠다 :)

   그리고 정규표현식 간단한것은 짤 수 있을정도로 해야하는가에 대한 궁금증이 생겼다.

   정규표현식을 왠만하면 사용하고 싶지는 않은데, 곰곰히 생각해보니 정규표현식만큼 편하고 간단하게 문자열을

   구분할 수 있는것이 있는가에 대한 답이 나오지 않는 이상은 정규표현식을 사용해야 할 것 같다.

   그래서 [자주쓰는 정규표현식을 모아놓으려고 Github gist](https://gist.github.com/antaehyeon/d80d4b90225ce86c269f26bc1c65cc97) 를 이용해보려고 한다.

   ```
   Class ArrayParser
     0. constructor
     0-1. resultObject : 결과값을 반환하기 위한 객체입니다.
     0-2. dividedCharacterDatas[] : string 데이터를 한글자씩 분리하여 담는 배열입니다.
     1. function divideString() : 파라미터로 들어오는 string 데이터를 한글자씩 분리합니다.
     2. function createObject() : 객체를 만드는 메서드입니다.
     3. function checkType(params) : 객체 중 Type 속성을 결정합니다.
     4. function getResult() : 결과 객체를 반환합니다.
   ```

   ```
   접근법
     Stack을 이용할까 생각했지만, 기존의 함수를 재사용하는 재귀방식으로 접근했습니다.
     테스트 케이스로 예를 들어보겠습니다.
     [123, [22, 23, [11, [112233], 112], 55], 33]
     '두번째 괄호'를 만날 때 마다 데이터를 아래와 같이 새로 찢습니다.
     [22, 23, [11, [112233], 112], 55]
     똑같이 찢습니다.
     [11, [112233], 112]
     또 똑같이 찢습니다.
     [112233]
   
     각 데이터를 새로 생성한 ArrayParser Class 에 파라미터로 넘깁니다.
   
     여기서부터 똑같은 함수(createObject)가 재활용되며
     최종적으로 만들어진 객체는 resultObject 로 반환됩니다.
     반환된 Object 는 해당 Class 의 resultObject(결과 Object) 에 추가되며
     역시 똑같이 계속 반환되며, 최종적으로 한개의 Object로 만들어집니다.
   ```

   

4. ### 여러가지 타입 분석

5. ### Object Type 지원

   1. 알 수 없는 타입에 걸림
   2. 현재 코드에서 쪼개지는 방식
      1. ['1a3',**[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99']**,{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}, true] 
      2. [null,false,**['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112]**,55, '99']
      3. ['11',[112233],**{easy : ['hello', {a:'a'}, 'world']}**,112]
      4. `{easy : ['hello', {a:'a'}, 'world']}`
         - {easy : ['hello', {a:'a'}, 'world'] : 2개의 괄호에 조건이 걸림

   ```
   {
       "type": Object
       "Key": easy
       "Value: ['hello', {a:'a'}, 'world']
   }
   
   {
       "type": Object
       "Key": easy
       "Value: [
           {
               "type": "String"
               "value": "'hello'"
               "child": []
           },
           {
               "type": "Object"
               "key": "a"
               "value": "'a'"
           },
           {
               "type": "String"
               "value": "'world'"
               "child": []
           }
       ]
   }
   ```

   - foreach 에서 continue 를 원한다면 `return;` 해주면 됨
     - createObject 의 구문을 전부 수정
     - 바로 return 될 수 있는 부분을 처리하여 간소화
   - `[]` 를 모으는 과정에서 `{}` 가 걸림
     - 그래서 `{}` 조건문을 맨 최상단으로 빼고 바로 return
     - `{` 와 `}` 의 count 갯수를 통해서 최종적으로 `{ ... }` 구문만 따로 메서드로 처리할 계획
   - Object 안에 있는 배열을 분석하는 과정에서 createObject 메서드를 재사용하는 부분으로 하려니 머리가 깨질듯 함
   - 새로운 class로 파지 않는 이상, createObject 메서드에서 dividedCharacterDatas 의 foreach 문이 수행되기 때문에, `{ }` 를 분석하기가 힘듬
   - 재귀로 해결해보자
   - 원래 `[]` 로 시작했던 구문을 따로 빼서 재귀로 돌렸던 것 처럼
   - `{}` 도 똑같이 createObject에 들어오게 함
     - 문제가, createObject의 사이즈가 커져버림
     - 그리고, 똑같은 구문에 걸려서 무한루프가 발생함
     - 모드를 구분, 클래스 만들 때 같이 넘겨줘야겠음
   - 일단은, createCurlyObject 메서드에서 `[]` 부분을 따로 빼서, createObejct의 재귀를 이용해보자
   - getResult 메서드에서 createObject 메서드를 호출하는 대신 createCurlyObject 메서드를 호출
   - 재귀에 재귀를 물고, 꼬리에 꼬리를 물어가지고 한번 디버깅을 놓치면 끝장남... 정신 똑띠차리자!
   - 하아 디버깅도 어렵고, 한번 풀면 다시 재현해내는것도 ... shit
   - 두번 째 쪼개지는 방식
     1. ['1a3',[null,false,['11',[112233],{easy : ['hello', {a:'a'}, 'world']},112],55, '99'],**{a:'str', b:[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]}**, true] 
     2. {a:'str', b:**[912,[5656,33],{key : 'innervalue', newkeys: [1,2,3,4,5]}]**}
        - key가 2개 이상 존재하는 조건들을 구분해줘야함
   - 한 Object 안에 key가 2개 들어갈 경우
   - key1 - value1, key2 - value2, ... 이런식으로 분류하는게 맞는데
   - 숫자로 모드를 구분?
   - 어차피 mergeData를 넣는것이므로, 한 메서드에서 처리
   - createCurlyObject 메서드에서도 `]` 를 두번 체크해야 함



6. ### Object Type 기능에 대한 고민

   http://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-standard-tokenizer.html

   위 링크가 무슨 말인지 이해가 잘 안된다

   일단은 Tokenizer 가 무엇인지, 무엇을 하는것인지도 아직 이해하지 못한 상태

   text가 구분자 (`" "`) 에 의해서 하나씩 짤려나오는 상태 ?

   **@crong "단위가 저런거구나"**

   **@crong "저런식으로 Tokenizer 를 통해 토큰묶음을 만들 수 있다"**

   ---

   https://blog.naver.com/echris7/140012828393

   ```java
     import java.util.StringTokenizer;
   
     public class NumberForm {
         public static void main(String[] args) {
             String token = new String("스트링을 구분자를 사용하여 구분하기");
             StringTokenizer tokenizer = new StringTokenizer(token, " "); // 구분자 공백(" ")
             
             System.out.println("Total Token Count :  "+ tokenizer.countTokens());
             while(tokenizer.hasMoreTokens()){
                 System.out.println("Token is : "+ tokenizer.nextToken());
              }
         }
     }
   ```

   `토큰` 의미를 갖는 최소한의 문자열

   `String Tokenizer` 는 String에서 구분자를 사용해 토큰을 얻어올 수 있다

   출력결과

   ---

   Total Token Count :  4

   Token is : 스트링을 

   Token is : 구분자를

   Token is : 사용하여 

   Token is : 구분하기

   ---

   그러면 일단 `Tokenizer` 은 알겠다.

   **@crong "`Tokenizer` 을 통해 `토큰묶음`을 만들 수 있죠"**

   토큰묶음?

   https://ariya.io/2011/08/math-evaluator-in-javascript-part1

   Math Evaluator in JavaScript: Part 1 (the Tokenizer)

   ```javascript
   // 도우미 함수들
   function isWhiteSpace(ch) {
       return (ch === 'u0009') || (ch === ' ') || (ch === 'u00A0');
   }
    
   function isLetter(ch) {
       return (ch >= 'a' && ch < = 'z') || (ch >= 'A' && ch < = 'Z');
   }
    
   function isDecimalDigit(ch) {
       return (ch >= '0') && (ch < = '9');
   }
   ```

   ```javascript
   // 유용한 보조함수
   function createToken(type, value) {
       return {
           type: type,
           value: value
       };
   }
   ```

   후반에 반복되는것을 피하기 위한 `createToken` 함수를 통해서 기본적인 `Token 객체` (type-value) 를 생성

   일단 여기까지..

   ---

   `토큰` = `문자 하나`

   ​	OK

   `토큰`이라는 단위를 `어떤 기준`으로 `자르는 것`도 가능

   ​	`어떤 기준` 구분자 ("", " " 등) 를 뜻하는 것 같다

   `하나의 의미있는 토큰`으로 다 `분리`하고 이를 `분석`해보는 것은 어떨까?

   ​	현재 나의 코드방식은 `split` 함수에 `구분자("")` 를 넣어서 한 문자씩 분리한다

   ​	이후 특정 문자 ([ ] { } ,) 에 따라서 분석한다

   ​	그 중에 재귀로 구성되어 있는 점

   ​	다른 방식이 있을까?

   `더 많은 함수`로 활용을 적극적으로 = `더 작은 단위`로

   ​	예를들어, if문의 하위내용을 모두 함수로 분리

   ​	되도록이면 createObject와 createCurlyObject에서 동시에 사용할 수 있는 메서드로 분리하고 싶은데

   ​	같은 조건이여도 두개의 수행내용이 달라서 (즉, 중복이 아닌 중복느낌) 찝찝한 기분을 지울수가 없다

   ```javascript
   /*
   	간단하게, continue 조건 (즉, 따로 수행되는 구문없이 바로 return 되는) 을 함수로 만들어서 처리
   	했을 때 createObject메서드와 createCurlyObject메서드에서 서로 다르게 동작하는 점을 처리할
   	수 없다
   */
   continueCase(param) {
       if (param === ' ') { return true; }
       if (param === '{') { return true; }
       return false;
   }
   ```

   ​	일단은 메서드 내에서 변수를 조작 (++) 시키거나, 간단한것들을 제외한 나머지를 메서드로 구성시켜보자

   ```javascript
   // foreach 반복문 중 '{' 가 감지되었을 경우, curlyBracketsMode 를 작동시킨다
   if (curlyBracketsMode) {
       mergeData += element;
       /*
       	일단 괄호의 갯수가 같다는 것은 재귀케이스
       	하지만 메서드 내의 변수라서.. 메서드로 따로 구분할 필요는 없을 듯 함
       */
       if (startCurlyBracketsCount === endCurlyBracketsCount) {
           curlyBracketsMode = false;
   
           /*
           	@INPUT : mergeData
           	@OUTPUT : mergeData ( from .getResult() )
           */
           const secondArrayParser = new ArrayParser(mergeData);
           mergeData = secondArrayParser.getResult();
       }
       return;
   }
   ```

   ​	if 안에 내용들을 하나씩 메서드로 만들고 싶은데 네이밍이 애매한 것 같음

   ```javascript
   
   ```

   ​	

   

   

   비슷한 두개의 함수의 관계를 통합해서 해볼 수 있는 방법은 없을까?

   [현재 나의 코드에서 `createObject Method` 와 `createCurlyObject Method`]

   

   



7. ### 테스트코드 작성

   - 테스트 코드를 이해한다	

     - https://item4.github.io/2016-03-19/Coding-with-Test-Code/

     - https://nesoy.github.io/articles/2017-01/TDD

     - http://huns.me/development/716

     - `테스트 주도 개발방법론` `TDD(Test-Driven Development)`

       ```
       정확한 프로그래밍 목적을 디자인 단계에서 반드시 미리 정의해야만 하고 또 무엇을 미리 정의해야한다.
       ```

       - `RED` 실패하는 테스트를 만들기
       - `GREEN` 테스트에 통과할 만한 작은 코드를 작성하기
       - `REFACTOR` 반복되는 코드, 긴 메소드, 큰 클래스, 긴 매개변수 목록 등등 코드를 좀 더 효율적으로 바꾸기
       - 문제를 먼저 정의하고, 문제의 해답을 찾아가는 과정
       - 내가 지금 만들어야 할 것이 무엇인지 우선적으로 명확하게 정의
       - 그 내용을 테스트로 표현하는 것이 TDD의 근본 취지
       - 테스트 코드도 사람이 작성하는 것이기 때문에 실수할 가능성이 존재함
       - 아주 단순한 기능을 만들어서 에러가 없음을 검증 후 조금씩 살을 붙여나가는 것이 TDD의 기본
       - 에러를 제거하는 코드를 최대한 빨리 단순하게 작성할 것을 강조
       - 

   - 테스트 코드를 구현하면서 내 코드를 테스트 가능한 상태로 개선한다

     ```javascript
     const sum = (a,b) => a+b;
     test("sum을 테스트해보죠", function() {
       equal(sum(1,2), 3); //true이면 성공이다. false이면 실`패.
     });
     ```

     ```javascript
     // a.js
     export.sum function(a,b) {
         if(b < 0) b = 0;
         return a + b;
     }
     ```

     ```javascript
     // a.test.js  
     const {sum} = require('./sum');
     
     test("두 개의 서로다른 양의 정수의 합이 올바르게 나온다", function() {
         //값을 설정하고,
         a = 10; b = 20;
     
         //sum을 실행하면,
         const result = sum(a+b);
     
         //그때 그 결과는 아래처럼.
         expect(30).toBe(result);
     });
     
     test("양의 정수와 음의 정수의 합이 올바르게 나온다", function() {
         //값을 설정하고,
         a = 10; b = -10;
     
         //sum을 실행하면,
         const result = sum(a+b);
     
         //그때 그 결과는 아래처럼.
         expect(0).toBe(result);
     });
     ```

     ```javascript
     // 결과
     두 개의 서로다른 양의 정수의 합이 올바르게 나온다  : OK
     양의 정수와 음의 정수의 합이 올바르게 나온다 : FAIL (targetValue is 10, expectValue is 0)
     ```

     - 아직 우리는 좋은 라이브러리를 쓰면서 다양한 테스트코드 구현을 하지 않고 있다.
     - 관심있다면 미리 mocha, jest와 같은 도구를 학습하는 것도 좋다.
     - given,when,then은 무엇이지`?`
       - `given` 어떤 상황이 들어간다
       - `when` 어떻게 동작한다
       - `then` 동작한 결과가 어떠해야 한다
       - `given-when-then` 패턴은 필수적으로 사용해야 하는것은 아님
     - unit test에 대해서 학습해본다.
     - TDD는 무엇인가?

   - 내 코드 메서드 구분

     - divideString
     - recursionCase(mergeData) 
     - createObject()
     - createCurlyObject()
     - setObjectData(mode, inputData)
     - typeDecision(inputData)
     - checkCorrectString(inputData)
     - removeSpace(inputData)
     - removeFirstParenthesis(inputData)
     - checkType(params)
     - getResult()

   - 다시 클래스 분할부터

     - main.js

     - lexer.js

       `어휘 분석기(Lexer)는 프로그램을 읽어 토큰(문장 자체를 문장을 이루고 있는 단어 단위로 쪼갠 것)을 생성하는 역할`

     - tokenizer.js

       `[컴퓨터 공학] 낱말 분석`

     - arrayParser.js

     - utility.js

   - test 메서드

   - expect 객체

   - toBe 메서드

   - [Module export import](http://hochulshin.com/javascript-module-export-import/)

     ```javascript
     //math.js
     exports.plus = function(a, b) {
       return a + b;
     };
        
     exports.multiply = function(a, b) {
       return a * b;
     };
     ```

     ```javascript
     //test.js
     var math = require("./math.js");
     console.log(math.plus(1, 2)); //3
     console.log(math.multiply(1, 2)); //2
     ```

   - [require with class constructor](https://stackoverflow.com/questions/42553700/node-js-require-class-with-constructor-parameter)

   - 테스트 함수를 만드는 이유

     ```
     소프트웨어가 업데이트 되면서 각각의 버전이 올라갈 때
     예전에 맞물려있는 기능들이 정상적으로 동작되는지 확인이 필요함
     즉, 테스트가 가능하게 만드는것이 목적임
     ```

   - 테스트가 가능한 부분이 많은것이지, 틀린것이 아님

     ```
     예를들어, CLASS 생성이 잘 되는지 안되는지 (PASS/FAIL)
     15개의 분기문이 있으면 = 15개의 테스트 함수가 동작한다는 말
     그러나 테스트가 가능한 부분이 많은것일뿐, 틀린것이 아님
     ```

   - 메서드마다 중요한 것, 할 수 있는것부터 테스트케이스를 작성하며, 최종적으로는 모든 메서드의 테스트케이스를 작성하는 것

   - 자동화 해주는 툴들도 많지만, 왜 필요한 것인지, 어떻게 하는 것인지에 대한 기초적인 지식을 쌓기 위함이 이번 arrayParser #6 임

   - ### 디버깅

     1. main.js 에서 코드실행
     2. `const arrayParserClass = require('./arrayParser');`
     3. `const arrayParser = new arrayParserClass(testCase1);`

        1. arrayParser.js 로 이동해서 constructor 수행함 (arrayParser.js:11 ~)
        2. 이때의 testCase1 은 `"[123, [22], 33]"`
     4. `const result = arrayParser.getResult();`

        1. `this.dividedCharacterDatas = util.divideString(this.inputString);`
           - 결과 값 : `"[123, [22], 33]"`
        2. `this.resultObject.type = lexer.checkType(this.inputString);`
           - 결과 값 : `"Array"`
        3. `this.resultObject = tokenizer.createObject(this.dividedCharacterDatas, this.resultObject);`
           1. **해당 부분에서 데이터를 한글자씩 판별하며 합침 ("[123,")**
           2. `forEach.call` 에 의해 동작 (tokenizer.js:100)
           3. "123" 에 대한 객체가 잘 만들어지는것을 확인 함
           4. 그리고 this.resultObject.child 에 정상적으로 push 함
           5. mergeData = "" (init) (tokenizer.js:60)
           6. **이제 다시 데이터를 한글자씩 판별하며 합침 ("[22]")**
           7. `]` 문자일 때, `case this.closedInnerSquareBracket():` 에 해당함
           8. 근데 갑자기, `this.mergeData` 가 `undefined` ???
              - 확인해보니 `tokenizer.js:120` 구문에서, `this.mergeData` 가 `undefined` 가 됨
              - 왜냐하면, `case this.closedInnerSquareBracket():` 은
              - `this.closedInnerSquareBracket = function(element)`
              - element 를 파라미터로 받기 때문인데, 넘겨주는게 없으니
              - `this.mergeData = element;` 에서 `this.mergeData` 가 `undefined` 가 되는 것임
              - 이걸 빠트리다니 하...
           9. 그래서 일단 `this.mergeData` 는 정상적으로 출력되는것이 확인됨
           10. 이후 `const recursionArrayParser = new secondArrayParser(this.mergeData);` 에서.. 바로 `loader.js` 로 이동해 `tryModuleLoad` 에서 finally - if(threw) 에 걸림 = 강제종료
           11. 
     5. 

   - #### 클래스를 합치고 나서 TESTCASE 7 작동

     - testCase가 구문 체크의 오류인지, 이상한 분기문으로 빠져 정상작동이 안됨
     - DEBUG DATA : `"{easy:['hello',{a:'a'},'world']"`
     - 일단은 `{` 문자가 나오고 나서, `[]` 구문이 먼저 처리되는 듯 함
     - 로직이 현재 헷갈려서 전 코드를 봐야겠음
     - `"{easy:['hello',{"` 일 때, `curlyBracketMode`가 `false` 가 됨
     - `"['11',[112233],{easy:['hello',{a:'a'},'world']},112]"`
       - this.startSquareBracketsCount : 2
       - this.endSquareBracketsCount : 1
       - 즉, `[` 가 2개, `]` 가 1개 있다는 뜻
       - 그래서 어느 조건에 걸리냐면
       - `closedInnerSquareBracket` 에 걸림
       - 그럼 어떻게 되냐면, 현재의 `this.mergeData` 를 가지고 `new ArrayParser(this.mergeData)` 를 수행하게됨
       - 원래 코드에서는 `endSquareBracketsCount`가 `0` 이기 때문에 안걸렸는데
       - 여기에서는 1 이기 때문에 걸린것
       - 왜 2, 1이 나왔냐면, `object` 를 할 때, `[]` 문자에 의해서 증가가 되는 것임

     ```javascript
           "type": "Object",
           "key": "a",
           "value": "'str'",
           "key2": ",b",
     ```

     - key2 에서 , 가 걸러지지 않고 b가 바로 출력됨

     

   - #### 테스트코드 작성 (STEP6) 에 대한 피드백

     ```
     arrayParser 클래스 역할이 좀 커졌네요. 메서드도 많아서 수정하고 스스로 디버깅하기 어렵진 않나요?
     분리하는게 답은 아니지만, 스스로 해결하기 어렵다면 이 큰 덩어리를 나누는 방법은 무엇인지 생각해보세요~
     ```

     - [JavaScript 객체지향](https://github.com/FEDevelopers/tech.description/wiki/%5BES6%5D%EA%B0%9D%EC%B2%B4%EC%A7%80%ED%96%A5-Javascript---Class)
     - [JavaScript Class 정의](http://steadypost.net/post/lecture/id/13/)
     - 상속
     - arrayParser 안에 `{}` 를 쪼개는 `createCurlyObject` 메서드가 `createObject` 메서드와 비슷하다
     - 따로 클래스로 빼면 어떨까?

     ```
     지금처럼 new Lexer로 할수도 있지만,
     module.exports = Lexer; 로 클래스 자체를 반환하는 게 좀더 일반적이긴 합니다.
     ```

     - `module.exports = Lexer;` 로 수정한 후, `lexer.checkType` 메서드를 호출할 때 **에러가 발생**한다
     - `lexer.checkType is not a function at ArrayParser.getResult`
     - `const {lexer} = require('./lexer');` 하면 에러 내용이 달라진다
     - `Cannot read property 'checkType' of undefined at ArrayParser.getResult` 
     - 아직 import 할 때, `{}` 차이를 잘 모르겠다
     - ES6의 export와 import를 사용하기 위해서 Babel 
     - [이건 나중에 참고할 글](https://github.com/codepink/codepink.github.com/wiki/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AA%A8%EB%93%88,-%EB%AA%A8%EB%93%88-%ED%8F%AC%EB%A7%B7,-%EB%AA%A8%EB%93%88-%EB%A1%9C%EB%8D%94%EC%99%80-%EB%AA%A8%EB%93%88-%EB%B2%88%EB%93%A4%EB%9F%AC%EC%97%90-%EB%8C%80%ED%95%9C-10%EB%B6%84-%EC%9E%85%EB%AC%B8%EC%84%9C)

     ---

     - ObjectParser 을 구성하였다.
     - 그런데, 결국은 상호참조가 되어버림.
     - 어떻게 다시 돌리기 힘들어서, import export 를 많이 검색함
     - ES6의 코드가 안돌아감 `대체 왜?`
     - 그래서 npm 중 Babel module 을 설치해서 돌려봄 = `안됨`
     - 결국은 함수를 통해서 생성해서 반환시켜줌 (__)
     - arrayParser 에서 objectParser 을 분리하다가, 계속 넘겨준 데이터가 초기화되는 버그가 발생
     - 원인은 생성자에서 this.mergeData = data 로 받고 맨 뒤에 this.mergeData = "" 하는 어이없는 실수를 발생

     ---

     - 원인이 무엇인지 모르겠는데, module.exports = Lexer; 로 클래스를 바로 넘겨버리면
     - 다른쪽에서 lexer.js의 메서드들을 사용할 수가 없는 문제가 발생
     - 생성자에서 `this.Lexer = new Lexer();` 을 통해서 생성했음에도 메서드에 접근이 안됨
     - 일단은 `const lexer = new Lexer();` 전역변수를 통해서 해결

     ---

     

8. ### [STEP 7] 오류상황 탐지

   - #### 요구사항

     - 배열이나 객체가 제대로 닫히지 않았는지 체크하는 부분을 추가한다.
     - 객체안에 colon이 누락된 경우가 있는지 체크한다.
     - 그외 엄격한 검사 로직을 1개 추가하고 이를 검증하는 코드를 구현한다.

   

   - #### 실행결과

     ```javascript
     var s = "['1a3',[null,false,['11',112,'99'], {a:'str', b:[912,[5656,33]]}, true]";
     var result = ArrayParser(str);
     //정상출력
     
     var s = "['1a3',[null,false,['11',112,'99' , {a:'str', b:[912,[5656,33]]}, true]";
     var result = ArrayParser(str);
     // 정상적으로 종료되지 않은 배열이 있습니다.
     
     var s = "['1a3',[null,false,['11',112,'99'], {a:'str', b: [912,[5656,33]], true]]";
     var result = ArrayParser(str);
     // 정상적으로 종료되지 않은 객체가 있습니다.
     
     var s = "['1a3',[null,false,['11',112,'99'], {a:'str', b  [912,[5656,33]]}, true]";
     var result = ArrayParser(str);
     // ':'이 누락된 객체표현이 있습니다.
     
     이외 오류상황을 최대한 탐지해서 오류내용과 함께 발생시킨다.
     ```

     

   - #### 구현사항

     - print class 를 따로 구성해서, `console.log` 로 찍히는 부분을 따로 뺌

     - 처음 입력받은 전체 `String Data` 의 `괄호 갯수([], {})를 확인`해서 갯수가 맞지 않으면 `process.exit()`

       ```javascript
       const startSquareBracketNum = (param.match(/\[/g) || []).length;
       const endSquareBracktNum = (param.match(/\]/g) || []).length;
       ```

     - Object의 `콜론(:)` 은, 해당 데이터를 현재 코드에 돌려보니, 정상적으로 작동하지만 `key-value` 쌍이 맞지 않게 결과가 출력됨

     - 그래서, 최종 결과를 출력하기 전에, key-value 가 문자열에 포함되어 있는지 확인함

       - `key` - `value`
       - `key2` - `value2`

     - 그 외, 엄격한 로직검사을 1개 추가

       ```javascript
       testCase : "[123, [22],, 33]"
       ```

       현재 나의 코드에서는 결과가 아래와 같이 출력됨

       ```javascript
       {
         "type": "Array",
         "child": [
           {
             "type": "Number",
             "value": "123",
             "child": []
           },
           {
             "type": "Array",
             "child": [
               {
                 "type": "Number",
                 "value": "22",
                 "child": []
               }
             ]
           },
           {
             "type": "Number",
             "value": "",
             "child": []
           },
           {
             "type": "Number",
             "value": "33",
             "child": []
           }
         ]
       }
       ```

       중간 부분이 공백으로 처리되지만, `type`은 `Number`로 체크됨

       공백도 하나의 type 으로 지정할까 생각했지만, **공백을 데이터로 판별하는 것은 왠지 맞지않다고 생각됨**

       

   

   - #### 에러사항

     1. 끝나는 `종료조건 (repeatCount === arrayEndPoint)` 조건에 해당되는 바람에 안에 타입들을 분석하지 못함

        테스트케이스 케이스 구문 수정 필요 

        `"['1a3',[null,false,['11',112,'99'], {a:'str', b:[912,[5656,33]]}, true]]"`  =>

        `"['1a3',[null,false,['11',112,'99'], {a:'str', b:[912,[5656,33]]}, true]"` 

        

   - #### 질문사항

     1. Print 클래스를 만들었을 경우, 함수 네이밍을 어떻게 해야하나요?

        ```javascript
        비정상적인 배열에 대한 에러를 출력하려고 하는 함수를 만드려고 합니다.
        print.printErrorAbnormalArray() ?
        print.ErrorAbnormalArray() ?
        ```

        이럴때는, `printUtil` 이나 `printManager` 와 같이 클래스명을 바꾸고 함수는 항상 `동사+명사`로 네이밍하면 된다.

        

   - #### [피드백](https://github.com/code-squad/javascript-json/pull/54)

     - 인자로 넘길 때, 객체로 넘긴 후 KEY 값으로 표현 (나중에 써보자)

     ---

     - `require` 와 `모듈 의존성`에 대해서 간단히라도 역사(history)를 살펴보면 좋을 거 같아요.
     - [[javascript] require vs import (CommonJs와 ES6)](https://blueshw.github.io/2017/05/16/ES-require-vs-import/)
       - 기존의 자바스크립트(ES5, 현재 대부분의 브라우저에서 지원하는 자바스크립트 문법)는 모듈이라는 개념이 부족하여 각 모듈(또는 파일)간의 의존성 처리에 제한
       - 고전적인 웹 프로젝트에서 자바스크립트를 사용하는 방법을 살펴보면, HTML 파일내부에 `<script>` 태그를 삽입하여 모듈을 로드
       - 그러나 문제는 자바스크립트 파일(또는 모듈)끼리 서로 모듈을 공유하는데 제약이 없다는 점
       - 그 이유는 script 태그로 로드된 모듈은 모두 window 객체의 속성이기 때문에 서로 다른 파일에 위치하면서도 모든 객체를 공유할 수 있기 때문
       - 각 자바스크립트 파일이 독립적으로 존재하지 못해 발생하는 여러 문제들`(예를들어 다른 파일에서 같은 이름의 변수를 사용하는 경우)`  때문에 하나의 모듈로 관리하기위한 다양한 패턴(모듈패턴, 즉시실행함수 등)을 사용하여 의존성을 관리할 수 밖에 없었습니다.
       - 이를 해결하기 위한 수단으로 모듈이라는 개념을 도입하여 정의한 방법(또는 표준)이 CommonJs와 AMD입니다. 이 둘은  내부적으로 모듈 서로 간의 의존성(로드)이 지원되지 않는 상태로 만들어졌는데, ES6에 이르러 언어 내부적으로 자바스크립트 모듈  의존성을 지원하게 되었습니다(import, export).
     - [자바스크립트 모듈, 모듈 포맷, 모듈 로더와 모듈 번들러에 대한 10분 입문서](https://github.com/codepink/codepink.github.com/wiki/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AA%A8%EB%93%88,-%EB%AA%A8%EB%93%88-%ED%8F%AC%EB%A7%B7,-%EB%AA%A8%EB%93%88-%EB%A1%9C%EB%8D%94%EC%99%80-%EB%AA%A8%EB%93%88-%EB%B2%88%EB%93%A4%EB%9F%AC%EC%97%90-%EB%8C%80%ED%95%9C-10%EB%B6%84-%EC%9E%85%EB%AC%B8%EC%84%9C)
       - EcmaScript5 및 이전 버전은 모듈을 염두해두고 디자인되지 않음
       - 시간이 지나면서 개발자들은 자바스크립트의 모듈화 디자인을 시뮬레이션하기 위해 다양한 패턴을 고안
         - 즉시 실행 함수 표현식(IIFE, Immediately Invoked Function Expressions)
         - 노출식 모듈(Revealing Module)
       - 모던 자바스크립트 개발 환경에서 툴링을 잘 이해하기 위해서는 모듈, 모듈 포맷, 모듈 로더와 모듈 번들러 사이의 차이를 이해하는 것이 중요하다.
     - [의존성 관리](https://github.com/nhnent/fe.javascript/wiki/%EC%9D%98%EC%A1%B4%EC%84%B1-%EA%B4%80%EB%A6%AC#%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-%EC%9D%98%EC%A1%B4%EC%84%B1-%EA%B4%80%EB%A6%AC)
     - [타입스크립트의 네임스페이스와 모듈](https://github.com/codepink/codepink.github.com/wiki/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%AA%A8%EB%93%88,-%EB%AA%A8%EB%93%88-%ED%8F%AC%EB%A7%B7,-%EB%AA%A8%EB%93%88-%EB%A1%9C%EB%8D%94%EC%99%80-%EB%AA%A8%EB%93%88-%EB%B2%88%EB%93%A4%EB%9F%AC%EC%97%90-%EB%8C%80%ED%95%9C-10%EB%B6%84-%EC%9E%85%EB%AC%B8%EC%84%9C)

     ---

     - #### 정규표현식

     - `gist` [regex.js](https://gist.github.com/antaehyeon/d80d4b90225ce86c269f26bc1c65cc97)

     - 문자열 조작과 정규표현식 (코드스쿼드 강의)

       - 코드의 양을 획기적으로 줄일 수 있다

       - 실무에서의 사용은?

       - 회원가입 (이메일, 주소, 전화번호 등) 에서의 규칙 검증

       - Textarea 에 입력된 것 중 불필요한 입력값 추출

       - 트랜스파일링

         - 최근의 자바스크립트 개발이 6,7,8 로 나아가지만
         - 현재의 브라우저에 바로 적용되지 않기 때문에
         - 실제 브라우저에 동작할 수 있게끔 소스코드를 변환하는
         - 이것 역시 `문자열 조작`이므로 정규표현식이 사용될 수 있음

       - `"1".match(/1/);`

       - `"a52b".match(/52/);`

         - 52 의 index 를 알아낼 수 있음

       - 문자열안에 있는 모든 두자리 숫자를 찾고 싶다

         - `"a99b".match(/\d\d/);`

         ```javascript
         var target = "abc32zzz";
         var r = /\d\d/;
         var result = target.match(r);
         result && result[0]; // "32"
         ```

       - [JavaScript Regex Cheatsheet](https://www.debuggex.com/cheatsheet/regex/javascript)

       - 한장에 요약되어 있는 Regex가 많으니, 잘 찾아서 출력해서 보면 개발할 때 편함 `cheatSheet`

         ```javascript
         "123-123".match(/\d\d\d-\d\d\d/)[0];
         /* 중복을 제거하자 */
         "113-123".match(/\d{3}-\d{3}/)[0];
         /* 우편번호는 5자리로 바뀌었다던데 */
         "19323".match(/\d{5}/)[0];
         /* 잠깐 OR 연산자좀 .. */
         "a".match(/(a|b)/)[0];
         "c".match(/(a|b)/)[0]; // null
         /* 본격적으로 OR 연산자를 통해서 우편번호를 */
         "123-323".match(/(\d{3}-\d{3}|\d{5})/)[0];
         "52423".match(/(\d{3}-\d{3}|\d{5})/)[0]; // 하위표현식 Sub Expression
         /* 우편번호 시작이 '9'로 이뤄지지 않도록 */
         "12323".match(/(\d{3}-\d{3}|[^9]\d{4})/)[0];
         "42323".match(/(\d{3}-\d{3}|[^5^9]\d{4})/)[0]; // 5도 해볼까?
         "42323".match(/(\d{3}-\d{3}|[0-46-8]\d{4})/)[0];
         /* 핸드폰 번호를 시작해봅시다 */
         "010-2006-2116".match(/01[01789]-\d{4}-\d{4}/)[0];
         ```

         ```javascript
         /* 코드에서 function 을 찾아볼까요 */
         \(?function\s+[a-zA-Z_$]+
         \s?(var|const|let)\s+[$_a-zA-Z]+
         /*
         \s = 공백
         \s? = 공백이 있거나 없거나
         + = 연속적인
         */
         /* 
         Replace var => const 
         괄호 하나를 $로 표현한다
         */
         Find : (\s?)(var)(\s+[$_a-zA-Z]+)
         Replace : $1const$3
         /*
         Replace
         $1 은 (\d{2}) 를 타겟함
         그
         */
         "011-021-0011".replace(/(\d{2})\d/, "$10");
         "010-021-0011"
         "$$$iloveyou###".replace(/.*([a-zA-Z]{8}).*/, "$1");
         "iloveyou"
         ```

       - 탐욕적(greedy), 게으른(lazy) 수량자

         - 뒤에서 부터 찾거나, 앞에서 부터 찾거나 (lazy를 써서 앞에서 부터 찾도록 하자)
         - greedy : *, +, {n,}
         - lazy : *?, +?, {n,}?

         ```javascript
         "011-021-0011-12312-123".match(/\d.*-/)[0];
         /*
         	우리가 찾고싶은 것은 '011-' 일 수 있음
         	그러나 탐욕적(greedy)이게도 반환되는 값은
         	'011-021-0011-12312-' 임
         */
         "011-021-0011-12312-123".match(/\d.*?-/)[0];
         /*
         	그래서, .* 에 ? 문자를 넣어주면 lazy(게으른) mode로 동작함
         	반환되는 값은	'011-' 임
         */
         ```

       - 정규표현식 추가로 알면 좋은 내용

         - backReference
         - 매칭되는 HTML 태그 찾기
         - () 부분을 뒤에서 \1, \2 로 찾아감

         ```javascript
         "<h1>abcd</h1><h2>두번째 제목입니다</h2>".match(/<h1>.*<\/h\d>/)[0];
         "<h1>abcd</h3><h2>두번째 제목입니다</h2>".match(/<h(\d)>[^(<\/h)].*?<\/h\1>/)[0]; // 올바른 HTML 태그를 찾는다
         "<h1>abcd</h3><h2>두번째 제목입니다</h2><h3>세번째 제목입니다</h3>".match(/<h(\d)>[^(<\/h)].*?<\/h\1>/g); // 글로벌 옵션 (전체 문자열을 타겟한다)
         ```

         - lookAhead `(?=)`

           ```javascript
           "<h1>abcd</h3><h2>두번째 제목입니다</h2><h3>세번째 제목입니다</h3>".match(/<h(\d)>[^(<\/h)]*?(?=<\/h\1>)/g);
           
           // Array [ "<h2>두번째 제목입니다", "<h3>세번째 제목입니다" ]
           ```

           `?=` 부분만 제외하고 나머지 부분을 (앞, 뒤) 유용하게 뽑아낼 수 있음

         ```javascript
         "ABV abc$ abc#".match(/abc/gi);
         /*
         	맨 끝 'i'는 ignore 형식으로 진행됨 (대소문자를 전부 거름)
         */
         "ABV abc$ abc#".match(/abc\$/gi);
         Array [ "abc$" ]
         "ABV abc$ abc#".match(/abc(?=\$)/gi);
         Array [ "abc" ] // 결과에서 $를 생략하고 싶을 때
         
         "ABV abc$ abc#".match(/\w{3}(?=\$)/gi);
         Array [ "abc" ]
         ```

       - A dot is any character

         ```javascript
         let reg = /CS.4/;
         
         alert( "CSS4".match(reg) ); // CSS4
         alert( "CS-4".match(reg) ); // CS-4
         alert( "CS 4".match(reg) ); // CS 4 (space is also a character)
         ```

       - [Sets](https://javascript.info/regexp-character-sets-and-ranges#sets)

         ```javascript
         For instance, [eao] means any of the 3 characters: 'a', 'e', or 'o'.
         // find "V", then [o or i], then "la"
         alert( "Voila".match(/V[oi]la/) ); // null, no matches
         // So there would be a match for Vola or Vila.
         ```

       - [And](https://stackoverflow.com/questions/5176384/regexp-logic-and-or)

         ```javascript
         earth|world
         /(?=.*earth)(?=.*world).*/
         ```

     ---

     ```javascript
     +exports.checkCorrectColon = (param) => {
     +    const toJsonStringData = JSON.stringify(param, null, 2)
     +    const inclusionKEY = toJsonStringData.includes("key");
     +    const inclusionKEY2 = toJsonStringData.includes("key2");
     ```

     - checkCorrectColon (param)
       1. 전부 출력된 결과를 `JSON 형태`로 만든다
       2. `"key"` 라는 문자열이 있는지 확인한다
       3. `"key"` 라는 문자열이 있으면 `"value"` 라는 문자열이 있는지 확인한다
       4. 반대로, `"value"` 라는 문자열이 있는데 `"key"` 라는 문자열이 있는지 확인한다
          - Object 의 경우 `key-value 쌍`으로 결과가 출력되기 때문
       5. `"key2"` 라는 문자열이 있는지 확인한다
       6. `"key2"` 라는 문자열이 있으면 `"value2"` 라는 문자열이 있는지 확인한다.
       7. 반대로, `"value2"` 라는 문자열이 있는데 `"key2"` 라는 문자열이 있는지 확인한다
       8. 없다면 `:` 문자가 빠졌으므로 에러를 출력한다
     - 정규 표현식을 적용하면
       - "key", "value", "key2", "value2" 의 문자열이 있는지 `동시에` 확인한다.
       - 그러므로 모든 조건에 대해서 `false` 를 내뿜음
       - 일단 `Object` 라는 문자열이 있는지 부터 확인해야함

   

9. ### [STEP 8] 통계

   - #### 요구사항

     - ArrayParser를 클래스 형태로 구현해서 객체를 통해서 접근할 수 있게 한다.
     - 모든 타입 갯수를 분석해서 출력한다.
     - 객체안의  value의 타입까지 합쳐서 계산한다.

     

   - #### 실행결과

     ```javascript
     var s = "['1a3',[null,false,['11',112,'99'], {a:'str', b:[912,[5656,33]]}, true]]";
     var ap = new ArrayParser(str);
     var stats = ap.getStats();
     
     //숫자 n개, 문자열 n개, null n개, boolean n개, 배열 n개, 객체 n개.
     //숫자 4개, 문자열 4개, null 1개, boolean 2개, 배열 5개, 객체 1개.
     ```

     

   - #### 구현사항

     - **정규식을 이용하는 방법**
       - 가장 독자적인 규격을 찾자
         - String Regex `/\'[a-z0-9]+\'/g;`
         - Null Regex `/null/g;`
         - Boolean(true, false) Regex `/(true|false)+/g;`
         - Array Regex `/\[/g;`
         - Object Regex `/\{/g;`
         - Number Regex `/[^\']\d+[^\']/g;`
     - 아니면 typeDecesion 메서드에서 카운트하고, 객체의 경우만 따로 뽑아내서 카운트
       - 객체 안에 배열이 들어있는 경우 카운트되므로, 예외사항이 하나 더 생기긴 함







- ### [typeOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)

  - https://cimfalab.github.io/deepscan/2016/07/typeof
  - `typeOf` 의 타입에는 `Array` 가 **존재하지 않음**
  - `typeof` 의 반환 값
    - undefined
    - object
    - boolean
    - number
    - string
    - function
    - symbol
  - 그래서 Array를 판별할때는 `Array.isArray(arrayData)` 을 사용
  - 



- ### [forEach, map](https://medium.com/@hongkevin/js-1-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%B0%B0%EC%97%B4-%EB%A9%94%EC%84%9C%EB%93%9C-1-foreach-map-b1cb1c2237d1)

  ```javascript
  let data= [1, 2, 3, 4, 5]
  
  // forEach 를 사용해서 원소의 값들을 각각 3씩 증가시키기
  let result = [];
  data.forEach(x => { result.push(x + 3) });
  console.log(result);
  
  // map 을 사용해서 원소의 값들을 각각 3씩 증가시키기
  let result2 = data.map(x => { return x + 3});
  console.log(result2);
  ```

  - return 의 차이 유/무
  - [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) 는 **return value** 가 `undefined` 인 반면, [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 은 **콜백 함수의 결과 값**들로 구성된 `새로운 배열(A new array with each element being the result of the callback function)`을 **return** 한다
  - 원소들의 합이나, 평균을 구하고자 한다면, 그리고 원래 배열과는 길이가 다른 배열 결과를 받고 싶다면 `forEach`
  - 배열을 순회하며 원소의 값들을 각각 가공해서 수정된/새로운 배열(원래 배열과 길이가 똑같은)을 return `map`




- ### [filter, reject, every, some](https://medium.com/@hongkevin/js-2-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%B0%B0%EC%97%B4-%EB%A9%94%EC%84%9C%EB%93%9C-2-filter-reject-every-some-4517f99fc998)

  - #### filter

    ```javascript
    const data = [1, 2, 3, 4, 5]
    const oddNumber = data.filter(val => { return val % 2 != 0 });

    console.log(oddNumber); // [1, 3, 5]
    console.log(data); // [1, 2, 3, 4, 5]
    ```

    호출한 배열에 대한 변화가 없으며, 새로운 배열로 반환됨

    - `_.isNil(value)` : Checks if `value` is `null` or `undefined`.
    - `_.isNull(value)` : Checks if `value` is `null`.
    - `_.isNumber(value)` : Checks if `value` is classified as a `Number` primitive or object.

    1. 클라이언트로 부터 전달받은 검색조건에 따라 필터가 적용된 쿼리결과를 return 하고 싶을 때
    2. null 값이나 특정 자료형을 걸러내고 싶을 때 사용
    3. filter 메서드는 희소배열의 경우, **`빈 원소를 건너뛰기 때문`**에 return 되는 배열에는 빈 원소가 없다(때문에 빈 원소를 제거하고 싶을 때 쓰면 굳)

  - ### every, some

    ```javascript
    const data = [1, 2, 3, 4, 5];

    const isAllOdd = data.every(val => { return val % 2 != 0 });
    console.log(isAllOdd); // false

    const isSomeOdd = data.some(val => { return val % 2 != 0 });
    console.log(isSomeOdd); // true
    ```

    every 와 some 메서드는 배열을 순회하면서 **`특정 조건을 배열의 값들이 만족`**시키는지 검사하는 메서드로서 호출한 배열이 결론적으로 조건을 만족시키는지(true), 만족시키지 못하는지(false)를 알려준다. every 와 some 의 차이는 **`every 가 배열의 모든 값이 조건을 만족해야, some 은 일부만 만족해도 true 를 return`** 한다.

    every, some 메서드는 **`반환 값이 결정되면 원소 순회를 중단`**한다.




- ### [Reduce](https://medium.com/@hongkevin/js-3-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%B0%B0%EC%97%B4-%EB%A9%94%EC%84%9C%EB%93%9C-reduce-100-%ED%99%9C%EC%9A%A9%EB%B2%95-feat-egghead-io-97c679857ece)

  ```javascript
  var votes = ["kim", "hong", "lee", "hong", "lee", "lee", "hong"];
  
  var reducer = function(accumulator, value, index, array) {
    if (accumulator.hasOwnProperty(value)) {
      accumulator[value] = accumulator[value] + 1;
    } else {
      accumulator[value] = 1;
    }
    return accumulator;
  }
  
  var initialValue = {};
  var result = votes.reduce(reducer, initialValue);
  console.log(result); // { kim: 1, hong: 3, lee: 3 }
  ```

  `accumulator` 은 `빈 객체` 로 시작함

  `return accumulator` 이 진행되면서 `accumulator` 이라는 `Object` 에 **데이터가 추가됨**

  `value` 에서는 votes 의 데이터를 순차적으로 받음 (즉, votes[index] 와 같음)

  `index` 에서는 0 부터 시작해서 1씩 증가함

  `array` 는 votes 와 똑같은 데이터가 받아짐

  

