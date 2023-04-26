from typing import *

# if TYPE_CHECKING:
# from typing_extensions import LiteralString

T = TypeVar("T")

from flask import Flask
from flask_restful import reqparse, abort, Api, Resource, fields, marshal_with
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)
CORS(app)

AccessID = NewType("AccessID", str)
BinUID = NewType("BinUID", str)
HexColor = NewType("HexColor", str)


# === [ config ] ===
VERSION = "v0.1"
HARD_CODED_BINS: frozenset[BinUID] = frozenset(
    (
        BinUID("00ffaa11"),
        BinUID("00fd8701"),
        BinUID("00fh2345"),
    )
)

UID_MAX_STR_WIDTH = 8

API_LIST_SEPARATOR = ","
# === end ===


_HEX_CHARS = set("123456789ABCDEF")


def binuid(__from: str) -> BinUID | None:
    if len(__from) > UID_MAX_STR_WIDTH:
        return None

    if not all(char for char in __from.upper() if char in _HEX_CHARS):
        return None

    return BinUID(__from)


# make a conveinieince function to add resources
def add_resource(
    *endpoints: str,
    version: bool | str = True,
) -> Callable[[type[T]], type[T]]:
    def add_resource_decorator(cls: Type[T]) -> Type[T]:
        nonlocal endpoints

        if version:
            vxx = version if isinstance(version, str) else VERSION
            endpoints = tuple(f"/{vxx}/{s}" for s in endpoints)

        api.add_resource(cls, *endpoints)
        return cls

    return add_resource_decorator


# api.add_resource(TodoList, "/todos")
# api.add_resource(Todo, "/todo/<todo_id>")


# private to this module
def _present_bins(
    bins: Iterable[BinUID], *, abort_on_fail: bool = False
) -> tuple[set[BinUID], set[BinUID]]:
    """
    :return: (present bins, missing bins)
    """
    bins = set(bins)
    return (bins & HARD_CODED_BINS, bins - HARD_CODED_BINS)


parser = reqparse.RequestParser()
parser.add_argument("task")


# Todo
# shows a single todo item and lets you delete a todo item


@add_resource("/highlight/access_id:<access_id>,bins:[<bins>]")
class Highlight(Resource):
    class HighightResponse(TypedDict):
        color: HexColor
        access_id: AccessID
        failed_bins: list[BinUID]

    def get(
        self,
        bins: str,
        access_id: AccessID,
    ) -> "Highlight.HighightResponse":

        parsed_bins: set[BinUID] = {
            b for uid in bins.split(API_LIST_SEPARATOR) if (b := binuid(uid))
        }

        _, missing = _present_bins(parsed_bins)

        return self.HighightResponse(
            color=HexColor("#00ff11"),
            access_id=access_id,
            failed_bins=list(missing),
        )


if __name__ == "__main__":
    app.run(debug=True, port=62301)