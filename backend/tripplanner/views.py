from rest_framework.decorators import api_view
from rest_framework.response import Response

from .services.hos_service import calculate_hos
from .services.route_service import get_route


@api_view(['POST'])
def plan_trip(request):

    start = request.data.get('start')
    end = request.data.get('end')
    cycle_used = request.data.get('cycle_used')

    route_data = get_route(start, end)

    summary = route_data['routes'][0]['summary']

    distance_meters = summary['distance']
    duration_seconds = summary['duration']

    distance_miles = distance_meters * 0.000621371
    duration_hours = duration_seconds / 3600

    hos = calculate_hos(distance_miles, cycle_used)

    return Response({
        "distance_miles": round(distance_miles, 2),
        "duration_hours": round(duration_hours, 2),
        "start": start,
        "end": end,
        "hos": hos
})