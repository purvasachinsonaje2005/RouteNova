def calculate_hos(distance_miles, cycle_used):

    avg_speed = 55

    driving_hours = distance_miles / avg_speed

    remaining_cycle = 70 - cycle_used

    breaks = int(driving_hours // 8)

    rest_periods = int(driving_hours // 11)

    return {
        "driving_hours": round(driving_hours, 2),
        "remaining_cycle": remaining_cycle,
        "breaks_required": breaks,
        "rest_periods": rest_periods
    }


