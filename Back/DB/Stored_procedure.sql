-- stored procedure 생성

DELIMITER //
CREATE PROCEDURE procedure_name()
BEGIN
  ...
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE get_name()
BEGIN
  SELECT membername FROM membertal;
END //
DELIMITER ;

# stored procedure 호출

CALL procedure_name();
