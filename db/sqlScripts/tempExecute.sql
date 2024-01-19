update Message set time_sent = (SELECT SEC_TO_TIME(
          FLOOR(
             TIME_TO_SEC('01:00:00') + RAND() * (
                  TIME_TO_SEC(TIMEDIFF('22:00:00', '01:00:00'))
             )
          )
        ));
