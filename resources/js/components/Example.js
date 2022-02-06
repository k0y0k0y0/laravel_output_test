import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import keyCodeMap from '../master/keymap'

const Example = () => {
    const [ timerNum, setTimerNum ] = useState(30); // タイマー
    const [ missNum, setMissNum ] = useState(0); // ミス数
    const [ wpm, setWpm ] = useState(0); // WPM
    const [ isStarted, setIsStarted ] = useState(false);
    const [ isEnd, setIsEnd ] = useState(false);
    const [ isCountDown, setIsCountDown ] = useState(false);
    const [ currentWordNum, setCurrentWordNum ] = useState(0); // 現在回答中の文字数目
    const [ currentProblemNum, setCurrentProblemNum ] = useState(0); // 現在の問題番号

    const element = document.getElementById('example');
    const propsData = Object.assign({}, element.dataset)

    let title = '';
    let drill = {};
    let categoryName = '';

    if('title' in propsData) title = propsData.title;
    if('drill' in propsData) drill = JSON.parse(propsData.drill);
    if('categoryName' in propsData) categoryName = propsData.categoryName;

    // TODO: HAVE TO EDIT
        // 問題テキスト
        const problemText = () => {
            return drill['problem' + currentProblemNum]
        }
        // 問題テキスト（配列形式）
        const problemWords = () => {
            return Array.from(drill['problem' + currentProblemNum])
        }
        // 問題の解答キーコード配列
        const problemKeyCodes = () => {
            if(!Array.from(drill['problem' + currentProblemNum]).length){
                return null
            }

            // テキストから問題のキーコード配列を生成
            let problemKeyCodes = []
            console.log(Array.from(drill['problem' + currentProblemNum]))
            Array.from(drill['problem' + currentProblemNum]).forEach((text) => {
                $.each(keyCodeMap, (keyText, keyCode) => {
                    if(text === keyText){
                        problemKeyCodes.push(keyCode);
                    }
                })
            })

            console.log(problemKeyCodes)

            return problemKeyCodes
        }
        // 問題の文字数
        const totalWordNum = () => {
            return problemKeyCodes.length
        }
        // タイピングスコア
        const typingScore = () => {
            return (wpm * 2) * (1 - missNum / (wpm * 2))
        }


    // =======================
    const doDrill = () => {
        setIsStarted(true);


    };
    // =======================


    // TODO: HAVE TO EDIT
    const showFirstProblem = () => {

        // 効果音読み込み

        // 入力イベント時に入力キーと解答キーをチェック
        $(window).on('keypress', e => {
            console.log(e.which)
            if(e.which === problemKeyCodes[currentWordNum]){
                console.log('正解！！')

                soundPlay(okSound)

                setCurrentWordNum(prevCurrentWordNum => prevCurrentWordNum + 1);
                setWpm(prevWpm => prevWpm + 1);
                console.log('現在回答の文字数目:' + currentWordNum)

                // 全文字正解終わったら、次の問題へ
                if(totalWordNum === currentWordNum){
                    console.log('次の問題へ！')
                    setCurrentWordNum(prevCurrentWordNum => prevCurrentWordNum + 1);
                    setCurrentWordNum(0);

                    soundPlay(nextSound)
                }
            }else{
                console.log('不正解です。。。。')

                soundPlay(ngSound)
                setMissNum(prevMissNum => prevMissNum + 1);

                console.log('現在回答の文字数目:' + currentWordNum)
            }

        })
    };

    const countTimer = () => {

        const endSound = new Audio('../sounds/gong-played2.mp3')

        let timer = window.setInterval(() => {
            setTimerNum(prevTimewNum => prevTimewNum -1);

            if(timerNum <= 0){
                setIsEnd(true);

                window.clearInterval(timer)
            }
        }, 1000)
    };

    var spanList = [];
    for(const index in problemWords){
        const classNameText = `{'text-primary': ${index} < currentWordNum}"`;
        spanList.push(
            <span className={classNameText}>{problemWords[index]}</span>
        )
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            { title } <span className="badge badge-success">{ categoryName }</span>
                        </div>

                        <div className="card-body text-center drill-body">
                            {!isStarted && <button className="btn btn-primary " onClick={doDrill}>START</button>}

                            {/* {(isStarted && !isCountDown && !isEnd) && <p>{timerNum}</p>} */}
                            {/* {(isStarted && !isCountDown && !isEnd) && {spanList}} */}

                            {/* {isEnd && <p>あなたのスコア</p>}
                            {isEnd && <p>{typingScore}</p>} */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
