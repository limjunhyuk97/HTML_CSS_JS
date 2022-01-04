-- Trigger 생성

DELIMITER //
CREATE TRIGGER trigger_name
  AFTER motion #(DELETE, INSERT, UPDATE의 작용에 대한 trigger 설정 가능)
  ON targer_table #(트리거 부착할 table)
  FOR EACH ROW #(각 행마다 적용)
BEGIN #(trigger로 정의할 내용들을 작성)
  ...
END //
DELIMITER ;

-- Trigger 예시
DELIMETER //
CREATE TRIGGER trg_deletemembertbl
    AFTER DELETE
    ON membertbl
    FOR EACH row
BEGIN
    INSERT INTO deletemembertbl
    VALUES (old.memberid, old.membername, old.memberaddress, curdate());
END //
DELIMITER ;

