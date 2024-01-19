SELECT SEC_TO_TIME(
          FLOOR(
             TIME_TO_SEC('01:00:00') + RAND() * (
                  TIME_TO_SEC(TIMEDIFF('24:00:00', '00:00:00'))
             )
          )
        );
