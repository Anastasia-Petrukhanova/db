select [Room].[number], [Room].[capacity], [Room].[cost], [Hotel].[name], [Hotel].[address], [Room].[photo], [Room].[status], string_agg(CONCAT([Extra].[name], ''), ', ')
from [Room]
inner join [Hotel] on [Hotel].[id] = [Room].[id_hotel]
inner join [Room_Extra] on [Room].[id] = [Room_Extra].[id_room]
inner join [Extra] on [Extra].[id] = [Room_Extra].[id_extra]
group by [Room].[number], [Room].[capacity], [Room].[cost], [Hotel].[name], [Hotel].[address], [Room].[photo], [Room].[status]