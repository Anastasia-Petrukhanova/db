USE [for_project]
GO

/****** Object:  Table [dbo].[Room]    Script Date: 24.12.2021 10:48:24 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Room](
	[id] [int] NOT NULL,
	[number] [smallint] NOT NULL,
	[cost] [int] NOT NULL,
	[capacity] [tinyint] NOT NULL,
	[id_hotel] [int] NULL,
	[photo] [nvarchar](200) NOT NULL,
	[status] [nvarchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[Room]  WITH CHECK ADD FOREIGN KEY([id_hotel])
REFERENCES [dbo].[Hotel] ([id])
GO


