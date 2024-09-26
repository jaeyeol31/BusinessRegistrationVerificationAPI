import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [businessNumber, setBusinessNumber] = useState('');  // 입력받을 사업자번호 상태
    const [result, setResult] = useState(null);  // 조회 결과 상태
    const [error, setError] = useState(null);    // 오류 상태

    // 폼 제출 핸들러 함수
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 백엔드로 POST 요청 보내기
            const response = await axios.post('/api/business/status', {
                b_no: [businessNumber]  // 사업자번호를 배열로 전송
            });
            setResult(response.data);  // 결과를 상태로 저장
            setError(null);  // 오류 초기화
        } catch (err) {
            setError('사업자 상태를 조회하는데 오류가 발생했습니다.');
            console.error(err);
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>사업자 등록번호 조회</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <label>
                    사업자번호:
                    <input 
                        type="text" 
                        value={businessNumber} 
                        onChange={(e) => setBusinessNumber(e.target.value)} 
                        placeholder="사업자번호 입력"
                        style={{ marginLeft: '10px', padding: '5px' }}
                    />
                </label>
                <button type="submit" style={{ marginLeft: '10px', padding: '5px 15px' }}>조회</button>
            </form>

            {/* 조회 결과 테이블로 보여주기 */}
            {result && (
                <div>
                    <h3>사업자 상태 조회 결과</h3>
                    {result.data && result.data.length > 0 ? (
                        <table style={{ margin: '0 auto', borderCollapse: 'collapse', width: '80%' }}>
                            <thead>
                                <tr>
                                    <th style={tableHeaderStyle}>항목</th>
                                    <th style={tableHeaderStyle}>정보</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.data.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td style={tableCellStyle}>사업자 번호</td>
                                            <td style={tableCellStyle}>{item.b_no}</td>
                                        </tr>
                                        <tr>
                                            <td style={tableCellStyle}>사업 상태</td>
                                            <td style={tableCellStyle}>{item.b_stt}</td>
                                        </tr>
                                        <tr>
                                            <td style={tableCellStyle}>사업 상태 코드</td>
                                            <td style={tableCellStyle}>{item.b_stt_cd}</td>
                                        </tr>
                                        <tr>
                                            <td style={tableCellStyle}>세금 유형</td>
                                            <td style={tableCellStyle}>{item.tax_type}</td>
                                        </tr>
                                        <tr>
                                            <td style={tableCellStyle}>세금 유형 코드</td>
                                            <td style={tableCellStyle}>{item.tax_type_cd}</td>
                                        </tr>
                                        <tr>
                                            <td style={tableCellStyle}>폐업일</td>
                                            <td style={tableCellStyle}>{item.end_dt || "해당 없음"}</td>
                                        </tr>
                                        <tr>
                                            <td style={tableCellStyle}>단위과세전환폐업 여부</td>
                                            <td style={tableCellStyle}>{item.utcc_yn}</td>
                                        </tr>
                                        <tr>
                                            <td style={tableCellStyle}>최근 과세유형 전환일자</td>
                                            <td style={tableCellStyle}>{item.tax_type_change_dt || "해당 없음"}</td>
                                        </tr>
                                        <tr>
                                            <td style={tableCellStyle}>세금계산서 적용일자</td>
                                            <td style={tableCellStyle}>{item.invoice_apply_dt || "해당 없음"}</td>
                                        </tr>
                                        <tr>
                                            <td style={tableCellStyle}>직전 과세유형</td>
                                            <td style={tableCellStyle}>{item.rbf_tax_type}</td>
                                        </tr>
                                        <tr>
                                            <td style={tableCellStyle}>직전 과세유형 코드</td>
                                            <td style={tableCellStyle}>{item.rbf_tax_type_cd}</td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>결과가 없습니다.</p>
                    )}
                </div>
            )}

            {/* 오류 메시지 보여주기 */}
            {error && <p>{error}</p>}
        </div>
    );
}

// 테이블 스타일
const tableHeaderStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    textAlign: 'center',
};

const tableCellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
};

export default App;
