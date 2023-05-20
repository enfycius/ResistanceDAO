import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'html-react-parser';
import { getBoards } from "../services/board.service";
import { postBoard } from "../services/board.service"; 
import axios from 'axios';
import './Board.css';

interface Post {
    title: string;
    content: string;
}

const Board: React.FC = () => {
    const [movieContent, setMovieContent] = useState<Post>({
        title: '',
        content: '<p>Hello from CKEditor 5!</p>',
    });

    const [viewContent, setViewContent] = useState<Post[]>([]);

    useEffect(() => {
        getBoards().then(
            (response) => {
              setViewContent(response.data);
            },
            (error) => {
              const _content =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
    }, []);

    const submitReview = () => {
        postBoard(movieContent.title, movieContent.content).then(
            () => {
                alert('등록 완료!');
            },
            (error) => {
                console.log(error);
            }
          );
    };

    const getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setMovieContent({
            ...movieContent,
            [name]: value,
        });
    };

    // vote_num
    let [like, setLike] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    return (
        <div className="App">
            <h1>Don't Hide Anymore!</h1>
            <br></br>
            <div className="movie-container">
                {viewContent.map((element, i) => (
                    <div key={i} style={{ border: '1px solid #333' }}>
                        <h2>{element.title} </h2>
                        <div>{ReactHtmlParser(element.content)}</div>
                        <span
                            onClick={() => {
                                let likeCnt = [...like];
                                likeCnt[i]++;
                                setLike(likeCnt);

                                const value = () => {
                                    axios
                                        .post('http://localhost:8080/api/post/board', {
                                            title: movieContent.title,
                                            content: movieContent.content,
                                        })
                                        .then(() => {
                                            alert('등록 완료!');
                                        });
                                };
                            }}
                        >
                            👍
                        </span>

                        {like[i]}
                    </div>
                ))}
            </div>
            <div className="form-wrapper">
                <input className="title-input" type="text" placeholder="제목" onChange={getValue} name="title" />
                <CKEditor
                    editor={ClassicEditor}
                    data="<p>Hello from CKEditor 5!</p>"
                    onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        setMovieContent({
                            ...movieContent,
                            content: data,
                        });
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
            </div>
            <button className="submit-button" onClick={submitReview}>
                입력
            </button>
        </div>
    );
}

export default Board;
